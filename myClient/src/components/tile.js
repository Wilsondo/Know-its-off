import React, {Component} from 'react';
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {CircleSpinner} from 'react-spinners-kit';

export default class Tile extends Component {
   state={
      scout_id: this.props.scout_id,
      scout_name: this.props.scout_name,
      scout_battery: this.props.scout_battery,
      appliance_name: this.props.appliance_name,
      appliance_type: this.props.appliance_type,
      appliance_status: this.props.appliance_status,
      status: "OFF",
      background: "light",
      loading: true
   }

   componentDidMount() {
      if(this.props.appliance_status){
         this.setState({
            background: "success",
            status: "ON"
         })
      }
      else if(!this.props.appliance_status){
         this.setState({background: "danger"})
      }
      this.setState({loading: false})
   }

   render(){
      if(this.state.loading) {
         return (
            <div className="d-flex justify-content-center m-5">
               <CircleSpinner size={60} color="#686769" loading={this.state.loading} />
            </div>)
      }
      return(
         <Card bg={this.state.background} className="text-center col mt-3">
            <Card.Header>
               <CircularProgressbar value={this.state.scout_battery} maxValue={1} text={`${this.state.scout_battery}%`}/>
               <Card.Title>{this.state.scout_name}</Card.Title>
            </Card.Header>
            <Card.Body>
               <Card.Title>{this.state.appliance_name}</Card.Title>
               <Card.Text>{this.state.appliance_type}</Card.Text>
               <Card.Text>{this.state.status}</Card.Text>
               <Link className="btn btn-primary text-wrap" to={"/scout/"+this.state.scout_id}>Edit Scout</Link>
            </Card.Body>
         </Card>
      )
   }
}
