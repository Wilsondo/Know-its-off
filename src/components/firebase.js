import firebase from 'firebase/app';
import 'firebase/messaging';
import React, {Component} from 'react';
import axiosBaseURL from '../axios.js';
import { Redirect } from 'react-router-dom';
import { Toast } from 'react-bootstrap';
import axios from 'axios';


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
      // console.log('current token for client: ', currentToken);
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

export default class Firebase extends Component {
	constructor(props) {
		super(props);
    this.state = {
      myDevices: [
        { device_state: 1, timestamp: "" }
      ],
      setTokenFound: false, 
      show: false, 
      notification: {title: '', body: ''},
      error: false,
      redirect: null,
      post: {
        notification: {
              title: "Firebase",
              body: "Firebase is awesome",
              click_action: "http://localhost:3000/",
              icon: "http://url-to-an-icon/icon.png"
          },
        user: "USER TOKEN"
      }
    }
  };

//  Take in an array of devices
//     For each device in array:
//       if device.state == 1:
//         if device.timestamp is 30+ minutes old:
//           send notification


// Probably should add a cool down timer to prevent constant notifications.
//Currently using a built in device id in this.state.to, reset it to use the users
//Remember to rewrite notification to fit FCM format  changeNotification = (myDevices) => {
    let currentDate = new Date();
    for(var x = 0; myDevices.length > x; x++){
       if(myDevices[x].device_state === 1){
        if((currentDate.getTime() - Date.parse(myDevices[x].timestamp)) >= 1800000){
          //console.log("currentDate - Date.parse(myDevices[x].timestamp"));
        //  this.setState({to: getToken()});
            axios.post('https://fcm.googleapis.com/fcm/send', this.state.post, { 
            headers: {
              'content-type': 'application/json'
            }
          });
        }
      }
    }
  }

  componentDidMount() {
    axiosBaseURL.get("/devices").then( (app_result) => {
      this.changeNotification(app_result.data);
    })
  }

  render() {
    if(this.state.error) {
      if(this.state.redirect) {return <Redirect to={this.state.redirect} />}
      return(<div><h3>There was an error</h3><h3>{this.state.error_response}</h3></div>)
    }
    getToken(this.state.setTokenFound);
    onMessageListener().then(payload => {
       this.setState({notification: {title: payload.notification.title, body: payload.notification.body, show: true}})
       console.log(payload);
     }).catch(err => console.log('failed: ', err));
    return(
      <Toast onClose={() => this.setState({show: false})} show={this.state.show} delay={3000} autohide animation style={{
        position: 'absolute',
        top: 20,
        right: 20,
        minWidth: 200}}></Toast>
    )
  }
}

