import React, {Component} from 'react'
import {CircleSpinner} from 'react-spinners-kit' 
import axios from 'axios'
import {Redirect} from 'react-router-dom'

export default class ApplianceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
	loading: true,
        myAppliance: {},
	error: false,
   redirect: null,
	postLoading: false,
   deleteLoading: false
    };
  }
     patchData = (event) => {
	     this.setState({postLoading:true});
	axios.patch(`/appliances/${this.state.myAppliance.id}`, this.state.myAppliance)
	     .then(
		     (result) =>{this.setState({postLoading: false}); 
			        alert("Changes saved.")})
        .catch((error) => {
            this.setState({postLoading:false,error:true})
            console.log(error.response)
         })
	event.preventDefault();
     };
handleChange = (event) => {
    this.setState({
      myAppliance : {...this.state.myAppliance, [event.target.name]: event.target.value}
    });
  };
handleChangeInt = (event) => {
   this.setState({myAppliance:{...this.state.myAppliance,[event.target.name]:parseInt(event.target.value)}})
}
handleChangeCheck = (event) => {
   this.setState({myAppliance: {...this.state.myAppliance, [event.target.name]: event.target.checked}})
};

   deleteAppliance = (event) => {
      this.setState({deleteLoading:true});
      const r = window.confirm("Do you really want to delete this, it will be permanent!");
      if(r){
         axios.delete("/appliances/"+this.state.myAppliance.id)
         .then((result) => {this.setState({deleteLoading:false,redirect:"/appliances"});})
         .catch((error) => {this.setState({deleteLoading:false,error:true})})
      }
   }

    componentDidMount() {
    const handle = this.props.match.params.handle;
    axios.get(`/appliances/${handle}`)
      .then(
        (result) => {
          this.setState({
            loading: false,
            myAppliance: result.data
          });
        }
      )
	.catch( (error) => {
		this.setState({loading: false, error: true});
      if(error.response.data === "not authorized"){ this.setState({redirect: "/"}) }
		console.log(error.response.data);
	}
	)
  }
	render(){
		if(this.state.error){
         if(this.state.redirect){ return(<Redirect to={this.state.redirect} />) }
			return(<div className="m-5"><h3>There was an error</h3></div>)
		}
		if(this.state.loading){
      			return (<div className="d-flex justify-content-center m-5"><CircleSpinner size={60} color="#686769" loading={this.state.loading} /></div>)
		}
		return(
<div className="m-5">
<form>
  <div className="form-group">
    <label>Appliance name</label>
    <input className="form-control" name="name" id="inputName" aria-describedby="nameHelp" onChange={this.handleChange} value={this.state.myAppliance.name} />
  </div>
  <div className="form-group">
    <label>Appliance type</label>
    <input className="form-control" name="type" id="inputType" onChange={this.handleChange} value={this.state.myAppliance.type} />
  </div>
  <div className="form-group">
    <label>Alert Message</label>
    <input className="form-control" name="alert_message" id="inputAlertMessage" onChange={this.handleChange} value={this.state.myAppliance.alert_message} />
  </div>
  <div className="form-group">
    <label>Alert Time</label>
    <input className="form-control" name="alert_time" id="inputAlertTime" onChange={this.handleChangeInt} value={this.state.myAppliance.alert_time} />
  </div>
  <div className="form-check">
    <input type="checkbox" className="form-check-input" name="alert_email"  onChange={this.handleChangeCheck} checked={this.state.myAppliance.alert_email} id="exampleCheck1" />
    <label className="form-check-label">Send email alerts</label>
  </div>
  <div className="form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck2" name="alert_text" onChange={this.handleChangeCheck} checked={this.state.myAppliance.alert_text} />
    <label className="form-check-label">Send text alerts</label>
  </div>
  <button onClick={this.patchData} className="btn btn-primary">Save changes <CircleSpinner size={20} color="#3BBCE5" loading={this.state.postLoading} /></button>
  <button onClick={this.deleteAppliance} className="btn btn-danger">Delete Appliance<CircleSpinner size={20} color="#3BBCE5" loading={this.state.deleteLoading} /></button>
</form>
</div>

		)
	}
	

}

