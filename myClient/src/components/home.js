import React, {Component, useEffect} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {CircleSpinner} from 'react-spinners-kit';
import Tile from './tile';
import {GridContextProvider,GridDropZone,GridItem,swap} from "react-grid-dnd";

function DnD() {
   const [items, setItems] = React.useState([]); // supply your own state
   useEffect(() => 
      axios.get('/scouts')
      .then((result) => {
         setItems(result.data)
      }), []);
   // target id will only be set if dragging from one dropzone to another.
  function onChange(sourceId, sourceIndex, targetIndex, targetId) {
    const nextState = swap(items, sourceIndex, targetIndex);
    setItems(nextState);
  }
  return (
      <GridContextProvider onChange={onChange}>
         <div className="container">
            <GridDropZone id="myScouts" boxesPerRow={4} rowHeight={100} style={{height:"400px"}}>
               {console.log(items)}
               {items.map(scout => (
                  <GridItem key={scout.id}>
                     <div style={{width:"100%",height:"100%"}}>
                        <Tile key={scout.id} scout_id={scout.id} scout_name={scout.name} scout_battery={scout.battery_power} appliance_name={scout.appliance_name} appliance_type={scout.appliance_type} appliance_status={scout.appliance_status}/>
                     </div>
                  </GridItem>
               ))}
            </GridDropZone>
         </div>
      </GridContextProvider>
  );
}

export default class Home extends Component {
   constructor(props) {
      super(props);
      this.state = {
         myAppliances: [],
         myScouts: [],
         loading: true,
         error: false,
         redirect: null
      };
   };

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
      .then( (app_result) => {
         this.setState({
            myAppliances: app_result.data,
            appliancesOn: this.countAppliancesOn(app_result.data)
         })
      axios.get("/scouts")
         .then( (sco_result) => {
            this.setState({ myScouts: sco_result.data })
            this.addAppliancetoScout(sco_result.data, app_result.data);
            this.setState({loading: false})
         })
         .catch( (error) => {
            this.setState({loading: false, error: true});
         })
      })
      .catch( (error) => {
         this.setState({loading: false, error: true});
      })
}

addAppliancetoScout(scouts, appliances) {
   let i, j;
   for(i in scouts){
      for(j in appliances){
         if(appliances[j].id === scouts[i].appliance_id){
            const app = appliances[j];
            let a = scouts.slice();
            //let newState = Object.assign({}, this.state);
            a[i].appliance_name = app.name;
            a[i].appliance_type = app.type;
            a[i].appliance_status = app.status;
            this.setState({myScouts: a});
         }
      }
   }
}

render(){
   if(this.state.loading) {
       return (
         <div className="d-flex justify-content-center m-5">
            <CircleSpinner size={60} color="#686769" loading={this.state.loading} />
         </div>)
   }
   if(this.state.error) {
      if(this.state.redirect) {return <Redirect to={this.state.redirect} />}
      return(<div><h3>There was an error</h3></div>)
   }
  
   return(
   <div>
      <div className="row m-3">
         <div className="col">
            <h1 className="text-center">Home</h1>
         </div>
      </div>
      <div className="row mb-3">
         <div className="col">
            <h6 className="text-muted text-center">
               {this.state.appliancesOn} of your appliances are on.
            </h6>
         </div>
      </div>
      {/*<div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-1 m-3">
      <Tile key={scout.id} scout_id={scout.id} scout_name={scout.name} scout_battery={scout.battery_power} appliance_name={scout.appliance_name} appliance_type={scout.appliance_type} appliance_status={scout.appliance_status}/>
      </div>*/}
{/*      <GridContextProvider onChange={this.onChange}>
         <div className="container">
            <GridDropZone id="myScouts" boxesPerRow={4} rowHeight={100}>
               {this.state.myScouts.map(scout => (
                  <GridItem key={scout.id}>
                     <div className="grid-item">
                        <div className="grid-item-content" style={{width:"100%",height:"100%"}}>
                           <Tile key={scout.id} scout_id={scout.id} scout_name={scout.name} scout_battery={scout.battery_power} appliance_name={scout.appliance_name} appliance_type={scout.appliance_type} appliance_status={scout.appliance_status}/>
                        </div>
                     </div>
                  </GridItem>
               ))}
            </GridDropZone>
         </div>
      </GridContextProvider>*/}
   <DnD />
   </div>
   )
}}
