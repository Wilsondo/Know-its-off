import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom';

export default class Devices extends Component {
	state={ // Doesn't accept current state because it's not extended as an item from GridApp.js like tile.js
		appliance_name: this.props.appliance_name,
		device_state: this.props.state,
		device_battery: this.props.device_battery,
		timestamp: this.props.timestamp,
		id: this.props.device_id,
		error: false
	}
	componentDidMount() {
		if (!this.props.state) {
			this.setState({error: true});
		}
	};
	render(){
		console.log(this.state);
		if(this.state.error) {
			if(this.state.redirect) {return <Redirect to={this.state.redirect} />}
			return(<div><h3>There was an error</h3><h3>{this.state.error_response}</h3></div>)
		 }
		return(
			<div className="col mt-3">
			<div className="card bg-light">
  				<div className="card-body">
    					<h5 className="card-title text-wrap">{this.state.appliance_name}</h5>
    					<p className="card-text">State:{this.state.device_state}</p>
    					<p className="card-text">Battery:{this.state.device_battery}</p>
						<p className="card-text">Last Seen:{this.state.timestamp}</p>
    					<Link to={"/device/" + this.state.id + "/edit"} className="btn btn-primary text-wrap">Modify device details</Link>
  				</div>
			</div>
			</div>
		)
	}
}

