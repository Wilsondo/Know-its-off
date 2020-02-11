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
			<div className="card m-3 bg-light" style={{width: "18rem"}}>
  				<div className="card-body">
    					<h5 className="card-title">{this.state.name}</h5>
    					<p className="card-text">Status:{this.state.status ? " On" : " Off"}</p>
    					<Link to={"/appliances/" + this.state.id} className="btn btn-primary">Modify appliance details</Link>
  				</div>
			</div>
		)
	}
}

