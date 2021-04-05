import React, { Component } from 'react'
import {CircleSpinner} from 'react-spinners-kit'
import axiosBaseURL from '../axios.js'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary} from '@material-ui/core/'

export default class EditUser extends Component {
    constructor(props) {
      super(props);
      this.state = {
         current: {
            email: "",
            password: "",
         },
         toChange: {
            email: "",
            oldPass: "",
            pass: "",
            checkPass: "",
            deleteconfirm: ""
         },
         loading: false,
         error: false,
         loading1: false, 
         loading2: false, 
         loading3: false, 
         expanded1: false,
         expanded2: false,
         expanded3: false
      };
   }

   componentDidMount() {
      axiosBaseURL.get("/user/current")
      .then((result) => {
         this.setState({
            loading: false,
            current: {
               email: result.data.email,
               password: result.data.password
            }
         });
      })
      .catch((error) => {
         this.setState({loading: false, error: true});
         if(error.response){
            this.setState({error_response: error.response.status});
         }
      })
   }

   handleChange = (event) => {
        this.setState({
           toChange: {...this.state.toChange,[event.target.name]: event.target.value}
        });
   };

   handleAccordion = (id) => (event) => {
      switch(id) {
         case 1:
            var ex1 = !this.state.expanded1
            this.setState({
               expanded1: ex1
             });
            break;
         case 2:
            var ex2 = !this.state.expanded2
            this.setState({
               expanded2: ex2
             });
            break;
         case 3:
            var ex3 = !this.state.expanded3
            this.setState({
               expanded3: ex3
             });
            break;
         default: 
            break;
      }
    };

   doEmail = (event) => {
      this.setState({loading1 : true});
      if(this.state.toChange.email === undefined || this.state.toChange.email === this.state.current.email) {
         alert("Please enter valid email into field");
         this.setState({loading1: false});
         event.preventDefault();
      }
      else {
         axiosBaseURL.patch('/user/current', {email: this.state.toChange.email})
         .then((result) => {
            this.setState({loading1: false})
            alert("User Information Successfully Updated!");
         })
         .catch((error) => {
            this.setState({changeLoad: false, error: true, error_response: error.response.data})
         });
      }
   }

   doPass = (event) => {
      var passCheck
      this.setState({loading2 : true});
      axiosBaseURL.post('/user/check/' + this.state.toChange.oldPass)
      .then(response => {
         if(this.state.toChange.pass === this.state.toChange.checkPass && response.status === 204) {
            axiosBaseURL.patch('/user/current', {password: this.state.toChange.pass})
            .then((result) => {
               this.setState({loading2: false})
               alert("User Information Successfully Updated!");
            })
         }
         else {
            alert("Your Passwords do not match");
            this.setState({loading2: false});
            event.preventDefault();
         }
      })
      .catch((error) => {
         this.setState({loading2: false, error_response: error.response.status})
         alert("Your old password is incorrect")
      })
   }

   delete = (event) => {
      this.setState({loading3 : true});
      const r = window.confirm("Are you sure?");
      if(r === true) {
          axiosBaseURL.post('/login', {email: this.state.current.email, password: this.state.toChange.deleteconfirm})
          .then((result) => {
              axiosBaseURL.delete('/user/current')
              this.setState({loading3: false})
              this.props.history.push('/login');
          })
          .catch((error) => {
              this.setState({loading3: false, error_response: error.response.status});
          })
      }
      else this.setState({loading : false})
   }

   render() {
      if(this.state.error) {
         return(<div className="m-5"><h3>Error: Not Logged In</h3></div>)
      }
      if(this.state.loading){
         return (
            <div className="d-flex justify-content-center m-5">
               <CircleSpinner size={60} color="#686769" loading={this.state.loading} />
            </div>)
      }
      return(
<div className="m-5 text-light">
   <Accordion className="bg-secondary text-light" expanded={this.state.expanded1} onChange={this.handleAccordion(1)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
         Change Email
      </AccordionSummary>
      <AccordionDetails>
         <input name="email" type="email" className="form-control" value={this.state.toChange.email} onChange={this.handleChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter new email address" />
         <button onClick={this.doEmail} className="btn btn-outline-info">Submit<CircleSpinner size={20} color="#3BBCE5" loading={this.state.loading1} /></button>
      </AccordionDetails>
   </Accordion>
   <Accordion className="bg-secondary text-light" expanded={this.state.expanded2} onChange={this.handleAccordion(2)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
         Change Password
      </AccordionSummary>
      <AccordionDetails>
      <div className="d-grid gap-2 d-md-flex">
         <div className="form-group container-fluid">
               <label>Current Password</label>
               <input name="oldPass" type="password" className="form-control" value={this.state.toChange.oldPass} onChange={this.handleChange} id="exampleInputPassword" aria-describedby="passwordHelp" placeholder="Current Password" />
         </div>
         <div className="form-group container-fluid">
            <label>New Password</label>
            <input name="pass" type="password" className="form-control" value={this.state.toChange.pass} onChange={this.handleChange} id="exampleInputPassword2" aria-describedby="passwordHelp" placeholder="New Password" />
         </div>
         <div className="form-group container-fluid gap-2">
            <label>Confirm Password</label>
            <input name="checkPass" type="password" className="form-control" value={this.state.toChange.checkPass} onChange={this.handleChange} id="exampleInputPassword1" aria-describedby="passwordHelp" placeholder="Confirm Password" />
         </div>
         <button onClick={this.doPass} className="btn btn-outline-info">Submit<CircleSpinner size={20} color="#3BBCE5" loading={this.state.loading2} /></button>
      </div>
      </AccordionDetails>
   </Accordion>
   <Accordion className="bg-secondary text-light" expanded={this.state.expanded3} onChange={this.handleAccordion(3)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header">
         Delete Account
      </AccordionSummary>
      <AccordionDetails>
      <input name="deleteconfirm" type="password" className="form-control" value={this.state.toChange.deleteconfirm} onChange={this.handleChange} id="exampleInput5" aria-describedby="emailHelp" placeholder="Enter your account password" />
         <button onClick={this.delete} className="btn btn-outline-info">Submit<CircleSpinner size={20} color="#3BBCE5" loading={this.state.loading3} /></button>
      </AccordionDetails>
   </Accordion>
</div>
       )
    }
}