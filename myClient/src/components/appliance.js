import React, {Component} from 'react'

export default class Appliance extends Component {
	state={
		name: null,
		state: false
	}
	render(){
		return(
			<div>
				<h3>Name: {this.name}</h3>
				<h4>State: {this.state ? "Off" : "On"}</h4>
			</div>
		)
	}
}

