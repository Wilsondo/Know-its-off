import firebase from 'firebase/app';
import 'firebase/messaging';

var firebaseConfig = {
    apiKey: "AIzaSyCGG2bVOzc9jR_dPhNlTxEn_ZTajkcHVzo",
    authDomain: "know-its-off-jsyg.firebaseapp.com",
    projectId: "know-its-off-jsyg",
    storageBucket: "know-its-off-jsyg.appspot.com",
    messagingSenderId: "1039398438265",
    appId: "1:1039398438265:web:f0e1ae04a1db6c68025ba8"
  };

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

export const getToken = (setTokenFound) => {
    return messaging.getToken({vapidKey: 'BHqTAUfRBDJlK88PZlXUl92tdXi_YmKp7HaR0RMHQBp0cXZ9bKxW3m53TN9KAf6WhuuO6ZkhYObb9fNOae85ZAc'}).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound = true;
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound = false;
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
  }

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
});