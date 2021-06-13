importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js");



firebase.initializeApp({
  messagingSenderId: "806703338833"
});
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  var notificationTitle = payload.data.title;
  var notificationOptions = {
    body: payload.data.body,
    icon: "/firebase-logo.png",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});




// messaging.onMessage(payload => {
//   console.log(payload);

// //   var notificationTitle = payload.notification.title;
// //   var notificationOptions = {
// //     body: payload.notification.body,
// //     icon: "/firebase-logo.png"
// //   };

// //   return self.registration.showNotification(
// //     notificationTitle,
// //     notificationOptions
// //   );
// });
