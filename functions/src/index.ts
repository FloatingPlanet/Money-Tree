import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';

admin.initializeApp();
const db = admin.firestore();
cors.apply({
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
});

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
export const onUserCreate =
  functions.auth.user().onCreate((user) => {
    console.log('A new user signed in for the first time.');
    return db.doc('Users/' + user.uid).get().then((res) => {
      res.ref.set({
        uid: user.uid,
        guest: false,
        email: user.email,
        username: user.displayName,
        cart: [],
        orders: [],
        createOn: new Date(),
      }).then(() => {
        console.log(`${user.uid} have been created into database!`);
      }).catch((error) => {
        console.log(error);
      });
    });

  });

export const onUserCartUpdate =
  functions.firestore.document('Users/{uid}/cart/{any}').onWrite((change, context) => {

    return new Promise((res, rej) => {
      const uid = context.params.uid;
      const newState = change.after.data();
      console.log(`updating ${uid} cart count`);
      const userCartCollection = db.collection(`Users/${uid}/cart`);
      userCartCollection.get().then((snapshot) => {
        let newCount = 0;
        snapshot.forEach((doc) => {
          if (doc.data().count < 1) {
            doc.ref.delete().then(() => {
              console.log(`${uid} remove item succeeded`);
            }).catch((error) => {
              console.error(error);
            });
          } else {
            newCount += doc.data().count;
          }
        });
        return db.doc(`Users/${uid}`).get().then((doc) => {
          doc.ref.update({cartSize: newCount}).then(() => {
            console.log(`user's cart size update: ${newCount}`);
            res(newState);
          }).catch((error) => {
            console.error(error);
            rej(error);
          });
        });
      }).catch((error) => {
        console.error(error);
        rej(error);
      });
    });
  });

export const grantPermission = functions.https.onCall((data, context) => {
  // get user and add custom claim(admin)
  if (context.auth?.token.admin) {
    return admin.auth().getUserByEmail(data.granteeEmail).then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true
      }).then(() => {
        return db.collection('Admins').doc(`${user.uid}`).set({
          granteeEmail: data.granteeEmail,
          grantDate: admin.firestore.Timestamp.now(),
          byWhom: data.granterEmail,
          grantLevel: 10
        }).then(() => {
          console.log(`${data.granteeEmail} entry created!`);
        }).catch((error) => {
          console.error(error, `${data.granteeEmail} entry created failed!`);
        });
      });

    }).then(() => {
      console.log(`${data.granteeEmail} added as Admin`);
      return {
        message: `Success! ${data.granteeEmail} has been made as an admin`,
        set: true
      };
    }).catch((error) => {
      console.error(error);
      return error;
    });
  } else {
    return {
      message: `Authentication failed`,
      set: false
    };
  }
});

export const validateCoupon = functions.https.onCall((coupon, context) => {
  return db.collection('Coupons').doc(`${coupon}`).get().then((doc) => {
    if (doc.exists) {
      console.log(`someone tries to use coupon: "${coupon}"`);
      return {
        doc: doc.data(),
        valid: true
      };
    } else {
      console.error(`someone tries to use non-existing coupon: "${coupon}"`);
      return {
        doc: '',
        valid: false
      };
    }
  }).catch((error) => {
    console.error(error, 'validating coupon error!');
    return error;
  });
});

