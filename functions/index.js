const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.sendNotification = functions.firestore
  .document("notifications/{notificationId}")
  .onWrite(change => {
    let documentRef = change.after.ref.id;
    let document = change.after.exists ? change.after.data() : null;
    console.info(document, documentRef);

    if (!document) {
      return null;
    }

    let token = document.token;
    let payload = {
      data: {
        title: "A message from deadline team",
        body: document.data
      }
    };
    return admin
      .messaging()
      .sendToDevice(token, payload)
      .then(response => {
        console.info("the notification was pushed", response);
        db.collection("notifications")
          .doc(documentRef)
          .delete();

        return true;
      })
      .catch(error => {
        console.log("an error occurred in pushing the notification", error);
        return false;
      });
  });

// exports.sendNotificationWhenNewTeamCreated = functions.firestore
//   .document("teams/{teamId}")
//   .onCreate(change => {
//     let documentRef = change.after.ref.id;
//     let document = change.after.exists ? change.after.data() : null;
//     console.info(document, documentRef);

//     if (!document) {
//       return null;
//     }
//     let token = [];
//     db.collection("teams/" + documentRef + "teamMembers")
//       .get()
//       .then(function(querySnapshot) {
//         querySnapshot.forEach(function(doc) {
//           let data = doc.data();
//           db.collection("users")
//             .doc(data.uid)
//             .get()
//             .then(doc => {
//               let userData = doc.data();
//               token.push(userData.token);
//             });
//         });
//       });
//     let payload = {
//       notification: {
//         title: "A message from deadline team",
//         body: "you have been added to the team" + document.teamName
//       }
//     };
//     return admin
//       .messaging()
//       .sendToDevice(token, payload)
//       .then(response => {
//         console.info("the notification was pushed", response);
//         db.collection("notifications")
//           .doc(documentRef)
//           .delete();

//         return true;
//       })
//       .catch(error => {
//         console.log("an error occurred in pushing the notification", error);
//         return false;
//       });

//   });
