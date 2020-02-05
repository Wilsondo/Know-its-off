import React, {Component} from 'react'
import Appliance from './appliance'
import {CircleSpinner} from 'react-spinners-kit' 

export default class Appliances extends Component {
  constructor(props) {
    super(props);
    this.state = {
	loading: true,
        myAppliances: [],
	error: false
    };
  }

    componentDidMount() {
    fetch("https://know-its-off.appspot.com/api/appliances")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loading: false,
            myAppliances: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            loading: false,
            error: true
          });
        }
      )
  }
	render(){
		if (this.state.loading) {
      			return (<div className="d-flex justify-content-center m-5"><CircleSpinner size={60} color="#686769" loading={this.state.loading} /></div>)
    		}
		if (this.state.error) {
			return(<div>There was an error</div>)
		}
		return(
			<div>
			{this.state.myAppliances.map(appliance => (
            		<Appliance name={appliance.name} status={appliance.status} />
          		))}
			<button className="btn btn-success m-3">Register a new appliance</button>
			</div>
		)
	}
	

}

