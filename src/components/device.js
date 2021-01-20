import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import axiosBaseURL from '../axios.js'


export default class Devices extends Component {
	constructor(props) {
		super(props);
		this.state = {	
			myDevice: {
				appliance_name: "My Appliance",
				device_state: 1, 
				device_battery: 100.0,
				timestamp: "2019-04-30T08:59:00.000Z",
				id: 1
			},
		error: false
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
		})
		.catch( (error) => {
			this.setState({error: true});
			if(error.response.data === "not authorized"){ this.setState({redirect: "/home"}) }
            else if (error.response.data){console.log(error.response)}
		})
	};
	render() {
		return(
			<div className="col mt-3">
			<div className="card bg-light">
  				<div className="card-body">
    					<h5 className="card-title text-wrap">{this.state.myDevice.appliance_name}</h5>
    					<p className="card-text">State: {this.state.myDevice.device_state}</p>
    					<p className="card-text">Battery: {this.state.myDevice.device_battery}</p>
						<p className="card-text">Last Seen: {this.state.myDevice.timestamp}</p>
    					<Link to={"/device/" + this.state.myDevice.id + "/edit"} className="btn btn-primary text-wrap">Modify device details</Link>
  				</div>
			</div>
			</div>
		)
	}
}

