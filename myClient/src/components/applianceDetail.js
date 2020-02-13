import React, {Component} from 'react'
import Appliance from './appliance'
import {CircleSpinner} from 'react-spinners-kit' 
import axios from 'axios'

export default class ApplianceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
	loading: true,
        myAppliance: {},
	error: false,
	postLoading: false
    };
  }
     patchData = (event) => {
	     this.setState({postLoading:true});
	axios.patch(`/appliances/${this.state.myAppliance.id}`, {name: this.state.myAppliance.name, type: this.state.myAppliance.type})
	     .then(
		     (result) =>{this.setState({postLoading: false}); 
			        alert("Changes saved.")})
	event.preventDefault();
     };
handleChange = (event) => {
    this.setState({
      myAppliance : {...this.state.myAppliance, [event.target.name]: event.target.value}
    });
  };

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
		console.log(error.response.data);
	
	}
	)
  }
	render(){
		if(this.state.error){
			return(<div className="m-5"><h3>There was an error</h3></div>)
		}
		if(this.state.loading){
      			return (<div className="d-flex justify-content-center m-5"><CircleSpinner size={60} color="#686769" loading={this.state.loading} /></div>)
		}
		return(
<div className="m-5">
<form>
  <div className="form-group">
    <label for="inputName">Appliance name</label>
    <input className="form-control" name="name" id="inputName" aria-describedby="nameHelp" onChange={this.handleChange} value={this.state.myAppliance.name} />
  </div>
  <div className="form-group">
    <label for="inputType">Appliance type</label>
    <input className="form-control" name="type" id="inputType" onChange={this.handleChange} value={this.state.myAppliance.type} />
  </div>
  <div className="form-check">
    <input type="checkbox" className="form-check-input" name="alert_email"  onChange={this.handleChange} checked={this.state.myAppliance.alert_email} id="exampleCheck1" />
    <label className="form-check-label" for="exampleCheck1">Send email alerts</label>
  </div>
  <div className="form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck2" name="alert_text" onChange={this.handleChange} checked={this.state.myAppliance.alert_text} />
    <label className="form-check-label" for="exampleCheck2">Send text alerts</label>
  </div>
  <button onClick={this.patchData} className="btn btn-primary">Save changes <CircleSpinner size={20} color="#3BBCE5" loading={this.state.postLoading} /></button>
</form>
</div>

		)
	}
	

}

