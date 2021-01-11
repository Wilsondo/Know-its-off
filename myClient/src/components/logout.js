import React, {Component} from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios'

export default class Logout extends Component {
   constructor(props) {
      super(props);
      this.state = {
         error: false,
         redirect: "/login"
      };
   }
	
   render(){
		if(this.state.error){
			return(<div classNameName="m-5"><h3>There was an error</h3></div>)
		}
	   // http call to /api/logout
      axios.get('/logout')
		return(   
         // redirect to /
         <Redirect to={this.state.redirect} />
      )
	}
}

