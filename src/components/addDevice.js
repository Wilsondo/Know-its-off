import React, {Component} from 'react'
import {CircleSpinner} from 'react-spinners-kit' 
import axiosBaseURL from '../axios.js'


export default class addDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myDevice: {
		   appliance_name: "My Appliance",
         device_state: "1", 
         device_battery: "100.0",
         timestamp: "2019-04-30T08:59:00.000Z",
	   },
      userDevices: [],
      applianceNames: [],
      disabled: false,
	   loading: true,
	   error: false,
	   postLoading: false,
      redirect: null
    };
  }

   //Get users appliances, add the names to the select form element
   componentDidMount() {
      axiosBaseURL.get("/devices")
      .then((result) => {
         this.setState({
            loading: false,
            usersDevices: result.data
         });
         var myList = [];
         var i;
         for(i in this.state.usersDevices) {
            myList.push([this.state.usersDevices[i].appliance_name, this.state.usersDevices[i].id])
         }
         this.setState({applianceNames: myList})
      })
      .catch( (error) => {
         this.setState({loading: false, error: true});
         if(error.response){
            this.setState({error_response: error.response.data});
            if(error.response.data === "not authorized"){ this.setState({redirect: "/"}) }
            else if (error.response.data){console.log(error.response.data)}
         }
      })
   }

   postData = (event) => {
      this.setState({postLoading:true});
      //if creating a new appliance post it first
      if(this.state.myDevice.device_id === 0){
         axiosBaseURL.post('/appliances', this.state.myDevice)
         .then((result) => {
            console.log(result)
            this.setState({ myDevice: {...this.state.myDevice, device_id: result.data.id} })
            this.postScout()
         })
         .catch((error) => {this.setState({postLoading:false, error:true})})
      }
      else {this.postScout()}
	   event.preventDefault();
   };
   postScout() {
      console.log(this.state)
      axiosBaseURL.post('/scouts', this.state.myDevice)
      .then((result) =>{
         this.setState({postLoading: false}); 
			alert("Appliance added.")
      })
      .catch((error) => {this.setState({postLoading:false, error:true})})
   };

   handleChange = (event) => {
      this.setState({
         myDevice : {...this.state.myDevice, [event.target.appliance_name]: event.target.value}
      });
   };
   handleChangeScout = (event) => {
      this.setState({
         myDevice : {...this.state.myDevice, [event.target.appliance_name]: event.target.value}
      });
   };
   handleChangeSelect = (event) => {
      //get the appliance id of the choosen value and set in state
      if(event.target.value === "New Device"){ 
         this.setState({
            disabled: false, 
            myDevice: {...this.state.myDevice, device_id: 0}
         })
      }
      else{
         this.setState({
            disabled: true, 
            myDevice: {...this.state.myDevice, device_id: parseInt(event.target.value)}
         })
      }
   };
   handleChangeCheck = (event) => {
      if(event.target.value === "false"){
         this.setState({myDevice: {...this.state.myDevice, [event.target.appliance_name]: true}})
      }
      else {
         this.setState({myDevice: {...this.state.myDevice, [event.target.appliance_name]: false}})
      }
   };

	render(){
		if(this.state.error){ 
         return(<div className="m-5"><h3>There was an error</h3></div>) 
      }
		if(this.state.loading){
         return (
            <div className="d-flex justify-content-center m-5">
               <CircleSpinner size={60} color="#686769" loading={this.state.loading} />
            </div>)
		}
      let options = this.state.applianceNames.map((data) =>
         <option key={data[1]} value={data[1]}>{data[0]}</option>
      );
		return(
<div className="m-5">
<h3>New Device</h3>
<form>
   <div className="form-group">
      <label>Device name</label>
      <input className="form-control" appliance_name="appliance_name" id="inputScoutName" aria-describedby="nameHelp" onChange={this.handleChangeScout} value={this.state.myDevice.appliance_name} />
   </div>

   <div className="form-group">
      <label>Choose Existing Device</label>
      <select className="form-control" id="inputDeviceId" onChange={this.handleChangeSelect}>
         <option>New Device</option>
         {options}
      </select>
   </div>

   <div className="form-group">
      <label>Appliance Name</label>
      <input className="form-control" appliance_name="appliance_name" id="inputApplianceName" disabled={this.state.disabled} onChange={this.handleChange} value={this.state.myDevice.appliance_name} />
   </div>
   <button onClick={this.postData} className="btn btn-success">Add this device<CircleSpinner size={20} color="#3BBCE5" loading={this.state.postLoading} /></button>
</form>
</div>
		)
	}
}

