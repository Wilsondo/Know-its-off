// This file is muk

import React, {Component} from 'react'
import {CircleSpinner} from 'react-spinners-kit' 
import axiosBaseURL from '../axios.js'

import {Redirect} from 'react-router-dom'

export default class editDevice extends Component {
   constructor(props) {
     super(props);
     this.state = {
       myDevice: {
          appliance_name: "My Appliance",
          device_state: 1, 
          device_battery: 100.0,
          timestamp: "2019-04-30T08:59:00.000Z",
          id: 1,
       },
      userDevices: [],
      appNames: [],
      newDevice_flag: false,
      disabled: true,
	   loading: true,
	   error: false,
	   patchLoading: false,
      deleteLoading: false,
      redirect: null
    };
  }

   //Get users appliances, add the names to the select form element
   componentDidMount() {
      const handle = this.props.match.params.handle;
      this.setState({id: handle})
      axiosBaseURL.get("/devices")
      .then((result) => {
         this.setState({ userDevices: result.data });
         //build a list called appNames used to create the options for the <select>
         var myList = [];
         var i;
         for(i in this.state.userDevices) {
            myList.push([this.state.userDevices[i].appliance_name, this.state.userDevices[i].id, parseInt(i)+1])
         }
         this.setState({ appNames: myList })
      })
      .catch( (error) => {
         this.setState({loading: false, error: true});
         if(error.response){
            this.setState({error_response: error.response.data});
            if(error.response.data === "not authorized"){ this.setState({redirect: "/"}) }
            else if (error.response.data){console.log(error.response)}
         }
      })
      console.log(this.state.myDevice)
   }

   updateDevice = (event) => {
      this.setState({patchLoading:true});
      if(this.state.myDevice.id === 0) {
         //post new appliance and return id to patch scout
         axiosBaseURL.post('/devices', this.state.myDevice) // unsure of plurality
         .then((result) => {
            this.setState({myDevice: {...this.state.myDevice, device_id: result.data.id}})
         })
         .catch((error)=>{
            this.setState({patchLoading:false,error:true})
            if(error.response.data){console.log(error.response)}
         })
      }
      else {
         axiosBaseURL.patch('/device/'+parseInt(this.state.myDevice.id), this.state.myDevice)
         .then((result) => {
         })
         .catch((error)=>{
            this.setState({patchLoading:false,error:true})
            if(error.response.data){console.log(error.response)}
         })
      }
	   event.preventDefault();
   };
   deleteDevice = (event) => {
      //need to confirm first
      const r = window.confirm("Do you really want to delete this, it will be permanent!");
      if(r === true){
         axiosBaseURL.delete("/device/"+this.state.id)
         .then((result) => {this.setState({redirect:"/home"})})
         .catch((error) => {
            this.setState({ error: true });
            if(error.response){
               console.log(error.response)
               this.setState({error_response: error.response.data})
            }
         })
      }
   };
   handleChangeDevice = (event) => { 
      this.setState({
         myDevice : {...this.state.myDevice, [event.target.appliance_name]: event.target.value}
      });
   };

	render(){
      if(this.state.redirect) {return <Redirect to={this.state.redirect} />}
		if(this.state.error){
         return(<div className="m-5"><h3>There was an error</h3></div>) 
      }
		if(this.state.loading){
         return (
            <div className="d-flex justify-content-center m-5">
               <CircleSpinner size={60} color="#686769" loading={this.state.loading} />
            </div>)
		}
		return(
<div className="m-5">
<h3>Edit Device</h3>
<form>
   <div className="form-group">
      <label>Appliance Name</label>
      <input className="form-control" name="name" id="inputDeviceName" aria-describedby="nameHelp" onChange={this.handleChangeDevice} value={this.state.myDevice.appliance_name} />
   </div>

   <button onClick={this.updateDevice} className="btn btn-success">Update<CircleSpinner size={20} color="#3BBCE5" loading={this.state.patchLoading} /></button>
   <button onClick={this.deleteDevice} className="btn btn-danger">Delete<CircleSpinner size={20} color="#3BBCE5" loading={this.state.deleteLoading} /></button>
</form>
</div>
		)
	}
}

