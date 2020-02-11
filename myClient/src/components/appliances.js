import React, {Component} from 'react';
import Appliance from './appliance';
import {CircleSpinner} from 'react-spinners-kit';
import axios from 'axios';
import {Link} from 'react-router-dom';

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
    axios.get("/appliances")
      .then(
        (result) => {
          this.setState({
            loading: false,
            myAppliances: result.data
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
		if (this.state.loading) {
      			return (<div className="d-flex justify-content-center m-5"><CircleSpinner size={60} color="#686769" loading={this.state.loading} /></div>)
    		}
		if (this.state.error) {
			return(<div><h3>There was an error</h3></div>)
		}
		return(
			<div>
			{this.state.myAppliances.map(appliance => (
            		<Appliance name={appliance.name} status={appliance.status} id={appliance.id}/>
          		))}
			<Link to="/appliances/new" className="btn btn-success m-3">Register a new appliance</Link>
			</div>
		)
	}
	

}

