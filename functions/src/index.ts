import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
export const onUserCreate =
  functions.auth.user().onCreate((user) => {
    console.log('A new user signed in for the first time.');
    return admin.database().ref('Users/' + user.uid).set({
      uid: user.uid,
      guest: false,
      email: user.email,
      username: user.displayName
    });
  });

// export const onUserCartUpdate =
//   functions.firestore.document('Users/{uid}').onUpdate((change) => {
//
//   });
