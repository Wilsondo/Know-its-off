import React, {Component} from 'react';
import Appliance from './appliance';
import {CircleSpinner} from 'react-spinners-kit';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

export default class Appliances extends Component {
  constructor(props) {
    super(props);
    this.state = {
	loading: true,
        myAppliances: [],
	error: false,
   redirect: null,
	appliancesOn: 0,
   error_response: null
    };
  }


 countAppliancesOn = (arr) => {
    var result = 0;
   for(var x = 0; arr.length > x; x++){
      if(arr[x].status === true){
        result++;
      }
   }
   return result;

}


    componentDidMount() {
    axios.get("/appliances")
      .then(
        (result) => {
          this.setState({
            loading: false,
            myAppliances: result.data,
            appliancesOn: this.countAppliancesOn(result.data) 
          });
        }
      )
	.catch( (error) => {
		this.setState({loading: false, error: true});
		if(error.response){
         this.setState({error_response: error.response.statusText});
			if(error.response.data === "not authorized"){ this.setState({redirect: "/"}) }
         else if (error.response.data){console.log(error.response)}
		}
	}
	)
    }
	render(){
		if (this.state.loading) {
      			return (<div className="d-flex justify-content-center m-5"><CircleSpinner size={60} color="#686769" loading={this.state.loading} /></div>)
    		}
		if (this.state.error) {
         if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
         }
			return(<div><h3>There was an error</h3><h3>{this.state.error_response}</h3></div>)
		}
		return(
			<div>
			<div className="row m-3">
			<div className="col">
			<h1 className="text-center">
			My appliances
			</h1>
			</div>
			</div>
			<div className="row m-3">
			<div className="col">
			<h6 className="text-muted text-center">
			{this.state.appliancesOn} of your appliances are on.
			</h6>
			</div>
			</div>
			<div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 m-3">
			{this.state.myAppliances.map(appliance => (
            		<Appliance key={appliance.id} name={appliance.name} status={appliance.status} id={appliance.id}/>
          		))}
			</div>
			<Link to="/appliances/new" className="btn btn-success m-3">Register a new appliance</Link>
			</div>
		)
	}
	

}
