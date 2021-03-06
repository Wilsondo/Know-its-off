import React, {Component} from 'react';
import {CircleSpinner} from 'react-spinners-kit' ;
import axiosBaseURL from '../axios.js';
import { Redirect } from 'react-router-dom';

export default class editDevice extends Component {
   constructor(props) {
     super(props);
     this.state = {
         myDevice: {
            appliance_name: "My Appliance",
            device_state: 1, 
            device_battery: 100.0,
            //timestamp: "2019-04-30T08:59:00.000Z",
            id: 1,
         },
         allDevices: [],
	      loading: true,
	      error: false,
      }
   };
   componentDidMount() {
      const handle = this.props.match.params.handle;
		dbString = "/device/" + handle
		axiosBaseURL.get(dbString)
		.then((result) => {
			this.setState({ 
				myDevice: {
					id: result.data.id, 
					appliance_name: result.data.appliance_name, 
					device_state: result.data.device_state, 
					device_battery: result.data.device_battery, 
            },
            loading: false
			});
      })
      .catch( (error) => {
         this.setState({loading: false, error: true});
         if(error.response){
            this.setState({error_response: error.response.data});
            if(error.response.data === "not authorized"){ this.setState({redirect: dbString}) }
            else if (error.response.data){console.log(error.response)}
         }
      })
   }
   
   updateDevice = (event) => {
      this.setState({loading:true});
      axiosBaseURL.get("/allDevices")
      .then((result) => {
         this.setState({
            allDevices: result.data
         })
      })
      let idVerify = true;
      for(var x = 0;x < this.state.allDevices.length; x++)
         if(this.state.myDevice.id === this.state.allDevices[x].id){
            idVerify = false;
         }
      if(idVerify) {
         axiosBaseURL.patch(dbString, this.state.myDevice)
         .then((result) => {
            this.setState({loading: false});
               alert("Device Updated Successfully!");
               this.props.history.push('/home');
         })
         .catch((error)=>{
            this.setState({loading:false})
            alert("Please enter a valid Device ID!");
         })
      }
      else {
         this.setState({loading:false})
         alert("Please enter a valid Device ID!");
      }
	   event.preventDefault();
   };


   handleChangeDevice = (event) => { 
      this.setState({
         myDevice : {...this.state.myDevice, [event.target.name]: event.target.value}
      });
   };

	render(){
		if(this.state.error) {
         if(this.state.redirect) {return <Redirect to={this.state.redirect} />}
         return(<div className="m-5"><h3>There was an error</h3></div>) 
      }
		if(this.state.loading){
         return (
            <div className="d-flex justify-content-center m-5">
               <CircleSpinner size={60} color="#686769" loading={this.state.loading} />
            </div>)
		}
		return(
<div className="m-5 text-light">
<h3>Edit Device</h3>
<form>
   <div className="form-group">
      <label>Appliance Name</label>
      <input className="form-control text-dark" name="appliance_name" id="inputApplianceName" aria-describedby="nameHelp" onChange={this.handleChangeDevice} value={this.state.myDevice.appliance_name} />
      <label>Device ID</label>
      <input className="form-control text-dark" name="id" id="inputDeviceId" aria-describedby="nameHelp" onChange={this.handleChangeDevice} value={this.state.myDevice.id} />
   </div>

   <button onClick={this.updateDevice} className="btn btn-success">Update<CircleSpinner size={20} color="#3BBCE5" loading={this.state.loading} /></button>
</form>
</div>
		)
	}
}

