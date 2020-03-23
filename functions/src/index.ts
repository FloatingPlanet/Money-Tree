import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();
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
  functions.firestore.document('Users/{uid}/cart/{**}').onWrite((change, context) => {
    const uid = context.auth?.uid;
    const x = change.after.data();
    return new Promise((res) => {
      console.log(uid);
      console.log(x);
      res();
    }).catch((error) => {
      console.error(error);
    });

  });
