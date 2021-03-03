import React, {Component} from 'react';
import axiosBaseURL from '../axios.js';
import {Redirect} from 'react-router-dom';
import {CircleSpinner} from 'react-spinners-kit';
import GridApp from './grid/GridApp';
import GridContext from './grid/GridContext';
import { getToken, onMessageListener } from './firebase';
import {Button, Toast} from 'react-bootstrap';



export default class Home extends Component {
   static contextType = GridContext
   constructor(props) {
      super(props);
      this.state = {
         myDevices: [],
         loading: true,
         error: false,
         redirect: null,
         isTokenFound: false, 
         setTokenFound: false, 
         show: false, 
         setShow: false, 
         notification: {title: '', body: ''}, 
         setNotification: {title: '', body: ''}
      };
   };


count_dev_state = (arr) => {
   var result = 0;
   for(var x = 0; arr.length > x; x++){
      if(arr[x].device_state === 1){
         result++;
      }
   }
   return result;
}

componentDidMount() {
   axiosBaseURL.get("/devices")
      .then( (app_result) => {
         this.setState({
            myDevices: app_result.data,
            num_on: this.count_dev_state(app_result.data)
         })
         const context = this.context
         context.setItems(app_result.data)
         this.setState({loading: false})
      })
      .catch( (error) => {
         this.setState({loading: false, error: true});
         console.log("error at get device: ", error.response)
      })
}

render(){
   if(this.state.loading) {
       return (
         <div className="d-flex justify-content-center m-5">
            <CircleSpinner size={60} color="#686769" loading={this.state.loading} />
         </div>)
   }
   if(this.state.error) {
      if(this.state.redirect) {return <Redirect to={this.state.redirect} />}
      return(<div><h3>There was an error</h3><h3>{this.state.error_response}</h3></div>)
   }
   const {isTokenFound, setTokenFound, show, setShow, notification, setNotification} = this.state;
   
   getToken(setTokenFound);
   onMessageListener().then(payload => {
      setShow(true);
      setNotification({title: payload.notification.title, body: payload.notification.body})
      console.log(payload);
    }).catch(err => console.log('failed: ', err));
   return(
      <div>
         <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation style={{
            position: 'absolute',
            top: 20,
            right: 20,
            minWidth: 200
         }}>
            <Toast.Header>
               <img
               src="holder.js/20x20?text=%20"
               className="rounded mr-2"
               alt=""
               />
               <strong className="mr-auto">{notification.title}</strong>
               <small>just now</small>
            </Toast.Header>
            <Toast.Body>{notification.body}</Toast.Body>
         </Toast>
      <div className="row m-3 text-light">
         <div className="col">
            <h1 className="text-center">Home</h1>
         </div>
      </div>
      <div className="row m-3 text-light">
         <div className="col">
            <h6 className="text-muted text-center">
               {this.state.num_on} of your appliances are on.
               {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
               {!isTokenFound && <h1> Need notification permission ❗️ </h1>} 
               <Button onClick={() => setShow(true)}>Show Toast</Button>
            </h6>
         </div>
      </div>
      <GridApp/>      
   </div>
   )
}}
