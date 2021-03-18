import React, {Component} from 'react';
import Card from 'react-bootstrap/Card'
import {Link} from 'react-router-dom';
import {CircleSpinner} from 'react-spinners-kit';

export default class Tile extends Component {
   state={
      device_id: this.props.device_id,
      appliance_name: this.props.appliance_name,
      device_state: this.props.state,
      timestamp: this.props.timestamp, 
      statusText: "OFF",
      background: "light",
      loading: true,
   }

   componentDidMount() {
      if(this.props.state === 1){
         this.setState({
            background: "success",
            statusText: "ON"
         })
      }
      else if(this.props.state === 2){
         this.setState({
            background: "warning", 
            statusText: "UNINITIALIZED"
         })
      }
      else if(this.props.state === 0){
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
         <Card bg={this.state.background} className="tile text-center col ">
            <Card.Header>
               <Card.Title className="card-title-device">{this.state.appliance_name}</Card.Title>
            </Card.Header>
            <Card.Body>
               <Card.Title className="card-title-status">{this.state.statusText}</Card.Title>
               <Card.Text className="card-text-device_state">{this.state.state}</Card.Text>
               <Card.Text className="card-text-timestamp">Last Seen: {this.state.timestamp}</Card.Text>
               <Link className="card-button btn btn-primary text-wrap" to={"/device/"+this.state.device_id}>Details</Link>
            </Card.Body>
         </Card>
      )
   }
}
