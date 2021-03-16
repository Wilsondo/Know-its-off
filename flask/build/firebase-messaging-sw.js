// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyCGG2bVOzc9jR_dPhNlTxEn_ZTajkcHVzo",
    authDomain: "know-its-off-jsyg.firebaseapp.com",
    projectId: "know-its-off-jsyg",
    storageBucket: "know-its-off-jsyg.appspot.com",
    messagingSenderId: "1039398438265",
    appId: "1:1039398438265:web:f0e1ae04a1db6c68025ba8"
  };

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});