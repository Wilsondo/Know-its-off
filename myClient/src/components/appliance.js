import React, {Component} from 'react'
import {Link} from 'react-router-dom';

export default class Appliance extends Component {
	state={
		name: this.props.name,
		status: this.props.status,
		id: this.props.id
	}
	render(){
		return(
			<div className="col mt-3">
			<div className="card bg-light">
  				<div className="card-body">
    					<h5 className="card-title text-wrap">{this.state.name}</h5>
    					<p className="card-text">Status:{this.state.status ? " On" : " Off"}</p>
    					<Link to={"/appliances/" + this.state.id} className="btn btn-primary text-wrap">Modify appliance details</Link>
  				</div>
			</div>
			</div>
		)
	}
}
