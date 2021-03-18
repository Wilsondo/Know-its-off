import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {CircleSpinner} from 'react-spinners-kit';
import axiosBaseURL from '../axios.js';

export default class Devices extends Component {
	constructor(props) {
		super(props);
		this.state = {	
			myDevice: {
				appliance_name: "",
				device_state: 1, 
				device_battery: 100.0,
				timestamp: "",
				id: 1
			},
		error: false,
		loading: true
		}
	};

	componentDidMount() {
		const handle = this.props.match.params.handle;
		var dbString = "/device/" + handle
		axiosBaseURL.get(dbString)
		.then((result) => {
			this.setState({ 
				myDevice: {
					id: result.data.id, 
					appliance_name: result.data.appliance_name, 
					device_state: result.data.device_state, 
					device_battery: result.data.device_battery, 
					timestamp: result.data.timestamp
				}
			});
			this.setState({loading: false})
		})
		.catch( (error) => {
			this.setState({error: true, loading:false});
			if(error.response.data === "not authorized"){ this.setState({redirect: "/home"}) }
            else if (error.response.data){console.log(error.response)}
		})
	};

	deleteDevice = (event) => {
		const r = window.confirm("Do you really want to delete this, it will be permanent!");
		if(r === true){
			const handle = this.props.match.params.handle;
			var dbString = "/device/" + handle
		   	axiosBaseURL.delete(dbString)
		   	.then((result) => {
			  this.setState({redirect: '/home', loading: false});
			  alert("Device Removed Successfully!");
			  this.props.history.push('/home');
		   })
		   .catch((error) => {
			  this.setState({ error: true });
			  if(error.response){
				 console.log(error.response)
				 this.setState({error_response: error.response.data})
			  }
		   })
		   event.preventDefault();
		}
	 };
	render() {
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
		return(
			<div className="col mt-3 text-light">
			<div className="card bg-dark">
  				<div className="card-body">
				  		<button onClick={this.deleteDevice} className="btn btn-sm btn-danger float-right" data-toggle="tooltip" data-placement="bottom" title="Delete Device">✖<CircleSpinner size={20} color="#3BBCE5" loading={this.state.loading} /></button>
    					<h5 className="card-title text-wrap">{this.state.myDevice.appliance_name}</h5>
						<p className="card-title text-wrap">Device id: {this.state.myDevice.id}</p>
    					<p className="card-text">State: {this.state.myDevice.device_state ? 'ON' : 'OFF'}</p>
    					<p className="card-text">Battery: {this.state.myDevice.device_battery}%</p>
						<p className="card-text">Last Seen: {this.state.myDevice.timestamp}</p>
    					<Link to={"/device/" + this.state.myDevice.id + "/edit"} className="btn btn-primary text-wrap" data-toggle="tooltip" data-placement="bottom" title="Change Device Details">Modify</Link>
						<Link to={"/device/" + this.state.myDevice.id + "/logs"} className="btn btn-success text-wrap float-right">Battery Logs</Link>
  				</div>
			</div>
			</div>
		)
	}
}

