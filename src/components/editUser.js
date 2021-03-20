import React, { Component } from 'react'
import {CircleSpinner} from 'react-spinners-kit'
import axiosBaseURL from '../axios.js'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, AccordionActions, Typography} from '@material-ui/core/'

export default class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: {
                username: "",
                email: "",
                password: "",
            },
            loading: false,
            error: false,
            redirect: null,

            expanded: false,
            setExpanded: false
        };
    }

   componentDidMount() {
      if(this.state.detail_form === false)
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
               if(error.response.data === "not authorized"){ this.setState({redirect: "/"}) }
            else if (error.response.data){console.log(error.response.data)}
         }
      })
   }

   verify = (event) => {
      this.setState({verifyLoad : true});
      axiosBaseURL.post('/login', {email: this.state.current.email, password: this.state.current.password})
      .then((result) => {
         this.setState({verifyLoad: false, detail_form: true, flag: false});
      })
      .catch((error) => {
         this.setState({verifyLoad: false, flag:true, error_response: error.response.status});
         if(error.response.data === "not authorized"){ this.setState({redirect: "/"}) }
         else if (error.response.data){console.log(error.response.data)}
      })
      event.preventDefault();
   }

   delete = (event) => {
        this.setState({deleteLoad : true});
        const r = window.confirm("Are you sure?");
        if(r === true) {
            axiosBaseURL.post('/login', {email: this.state.current.email, password: this.state.current.password})
            .then((result) => {
                axiosBaseURL.delete('/user/current')
                this.setState({deleteLoad: false, redirect: "/"})
            })
            .catch((error) => {
                this.setState({deleteLoad: false, flag:true, error_response: error.response.status});
                if(error.response.data === "not authorized"){ this.setState({redirect: "/"}) }
                else if (error.response.data){console.log(error.response.data)}
            })
        }
        else this.setState({loading : false})
   }

   handleChange = (event) => {
        this.setState({
           current: {...this.state.current,[event.target.name]: event.target.value}
        });
   };

   accordionChange = (panel) => (event, isExpanded) => {
      const result = isExpanded ? panel : false;
      this.setState({setExpanded: result});
   }


   update = (event) => {
      this.setState({changeLoad: true})
      if(this.state.current.email === undefined || this.state.current.username === undefined) {
         alert("Fill out Username field.");
         this.setState({changeLoad: false});
         event.preventDefault();
      }
      else if(this.state.confirmPass !== this.state.currentPass) {
         alert("Passwords do not match.");
         this.setState({changeLoad: false});
         event.preventDefault();
      }
      else {
         axiosBaseURL.post('/login', {email: this.state.current.email, password: this.state.current.password})
         .then((result) => {
            axiosBaseURL.patch('/user/current', {email: this.state.current.email, password: this.state.confirmPass, username: this.state.current.username})
            .then((result) => {
               this.setState({changeLoad: false})
               alert("User Information Successfully Updated!");
            })
            .catch((error) => {
               this.setState({changeLoad: false, error: true, error_response: error.response.data})
               if(error.response.data === "not authorized"){ this.setState({redirect: "/"}) }
               else if (error.response.data){console.log(error.response.data)}
            });
         })
         .catch((error) => {
            this.setState({changeLoad: false, error: true, error_response: error.response.data})
            if(error.response.data === "not authorized"){ this.setState({redirect: "/"}) }
            else if (error.response.data){console.log(error.response.data)}
         });
         event.preventDefault();
      }
   };

   // useStyles = makeStyles((theme) => ({
   //    root: {
   //      width: '100%',
   //    },
   //    heading: {
   //      fontSize: theme.typography.pxToRem(15),
   //      flexBasis: '33.33%',
   //      flexShrink: 0,
   //    },
   //    secondaryHeading: {
   //      fontSize: theme.typography.pxToRem(15),
   //      color: theme.palette.text.secondary,
   //    },
   //  }));

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
<div>
   <Accordion {... this.setState({expanded: "panel1"})} onChange={this.accordionChange('panel1')}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
         <Typography className="fontSize: theme.typography.pxToRem(15), flexBasis: '33.33%', flexShrink: 0">Change Email</Typography>
         <Typography className="fontSize: theme.typography.pxToRem(15), color: theme.palette.text.secondary">Enter a new Email Address</Typography>
      </AccordionSummary>
      <AccordionDetails>
         <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
            maximus est, id dignissim quam.
         </Typography>
      </AccordionDetails>
      </Accordion>
      <Accordion {... this.setState({expanded: "panel2"})} onChange={this.accordionChange('panel2')}>
         <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
            <Typography className="fontSize: theme.typography.pxToRem(15), flexBasis: '33.33%', flexShrink: 0">Users</Typography>
            <Typography className="fontSize: theme.typography.pxToRem(15), color: theme.palette.text.secondary">
               You are currently not an owner
            </Typography>
         </AccordionSummary>
         <AccordionDetails>
           <Typography>
             Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
             diam eros in elit. Pellentesque convallis laoreet laoreet.
           </Typography>
         </AccordionDetails>
       </Accordion>
       <Accordion {... this.setState({expanded: "panel3"})} onChange={this.accordionChange('panel3')}>
         <AccordionSummary
           expandIcon={<ExpandMoreIcon />}
           aria-controls="panel3bh-content"
           id="panel3bh-header"
         >
           <Typography className="fontSize: theme.typography.pxToRem(15), flexBasis: '33.33%', flexShrink: 0">Advanced settings</Typography>
           <Typography className="fontSize: theme.typography.pxToRem(15), color: theme.palette.text.secondary">
             Filtering has been entirely disabled for whole web server
           </Typography>
         </AccordionSummary>
         <AccordionDetails>
           <Typography>
             Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
             vitae egestas augue. Duis vel est augue.
           </Typography>
         </AccordionDetails>
       </Accordion>
       <Accordion {... this.setState({expanded: "panel4"})} onChange={this.accordionChange('panel4')}>
         <AccordionSummary
           expandIcon={<ExpandMoreIcon />}
           aria-controls="panel4bh-content"
           id="panel4bh-header"
         >
           <Typography className="fontSize: theme.typography.pxToRem(15), flexBasis: '33.33%', flexShrink: 0">Personal data</Typography>
         </AccordionSummary>
         <AccordionDetails>
           <Typography>
             Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
             vitae egestas augue. Duis vel est augue.
           </Typography>
         </AccordionDetails>
       </Accordion>
</div>
       )
    }
}