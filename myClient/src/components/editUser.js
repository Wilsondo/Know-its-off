import React, {Component} from 'react'
import {CircleSpinner} from 'react-spinners-kit' 
import axios from 'axios'

export default class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user: {},
	   loading: true,
	   error: false,
	   patchLoading: false,
      deleteLoading: false,
      redirect: null
    };
  }

   //Get users appliances, add the names to the select form element
   componentDidMount() {
      axios.get("/users/current")  //can put anything in for an id here, it will always return the current_user
      .then((result) => {
         this.setState({ current_user: result.data, loading: false });
      })
      .catch( (error) => {
         this.setState({loading: false, error: true});
         if(error.response){
            this.setState({error_response: error.response.data});
            if(error.response.data === "not authorized"){ this.setState({redirect: "/"}) }
            else if (error.response.data){console.log(error.response.data)}
         }
      })
   }

   updateUser = (event) => {
      this.setState({patchLoading:true});
      axios.patch('/users/current', this.state.current_user)
      .then((result) => {
         this.setState({patchLoading: false});
         alert("User updated.");
      })
      .catch((error) => {
         this.setState({patchLoading:false, error_response: error.response.data});
         if(error.response.data === "not authorized"){ this.setState({redirect: "/"}) }
         else if (error.response.data){console.log(error.response.data)}
      })
      event.preventDefault();
   }
   deleteUser = (event) => {
      this.setState({deleteLoading:true});
      const r = window.confirm("Do you really want to delete this, it will be permanent!");
      if(r === true){
         axios.delete('/users/current')
         .then((result) => { this.setState({deleteLoading: false});})
         .catch((error) => {
            this.setState({error_response: error.response.data});
            if(error.response.data === "not authorized"){ this.setState({redirect: "/"}) }
            else if (error.response.data){console.log(error.response.data)}
         })
      }
      else{ this.setState({deleteLoading: false}) }
   }

   handleChange = (event) => {
      this.setState({
         current_user : {...this.state.current_user, [event.target.name]: event.target.value}
      });
   };

	render(){
		if(this.state.error){ 
         return(<div className="m-5"><h3>There was an error</h3></div>) 
      }
		if(this.state.loading){
         return (
            <div className="d-flex justify-content-center m-5">
               <CircleSpinner size={60} color="#686769" loading={this.state.loading} />
            </div>)
		}
		return(
<div className="m-5">
<form>
   <div className="form-group">
      <label>First Name</label>
      <input className="form-control" name="first_name" id="inputFirstName" aria-describedby="nameHelp" onChange={this.handleChange} value={this.state.current_user.first_name} />
   </div>

   <div className="form-group">
      <label>Last Name</label>
      <input className="form-control" name="last_name" id="inputLastName" onChange={this.handleChange} value={this.state.current_user.last_name} />
   </div>

   <div className="form-group">
      <label>Email</label>
      <input className="form-control" name="email" id="inputEmail" onChange={this.handleChange} value={this.state.current_user.email} />
   </div>

   <div className="form-group">
      <label>Phone Number</label>
      <input className="form-control" name="phone_number" id="inputPhoneNumber" onChange={this.handleChange} value={this.state.current_user.phone_number} />
   </div>

   <div className="form-group">
      <label>Password</label>
      <input className="form-control" name="password" id="inputPassword" onChange={this.handleChange} value={this.state.current_user.password} />
   </div>

   <button onClick={this.updateUser} className="btn btn-success">Update User Settings<CircleSpinner size={20} color="#3BBCE5" loading={this.state.patchLoading} /></button>
   <button onClick={this.deleteUser} className="btn btn-danger">Delete User Permantenly<CircleSpinner size={20} color="#3BBCE5" loading={this.state.deleteLoading} /></button>
</form>
</div>
		)
	}
}

