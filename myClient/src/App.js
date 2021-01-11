import React, {Component} from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import Appliances from './components/appliances';
import MyNavbar from './components/navbar';
import NewAppliance from './components/newAppliance';
import Default from './components/default';
import Login from './components/login';
import Signup from './components/signup';
import Logout from './components/logout'
import ApplianceDetail from './components/applianceDetail';
import Home from './components/home';
import AddScout from './components/addScout';
import EditScout from './components/editScout';
import EditUser from './components/editUser';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_BASEURL;

const NavRoute = ({exact, path, component: Component}) => (
    <Route exact={exact} path={path} render={(props) => (
      <div>
        <MyNavbar />
        <Component {...props}/>
      </div>
    )}/>
  )


class App extends Component {
    render() {
        return (
		<React.Fragment>
		  <Router>
		    <Switch>
			   <Route exact path="/" component={Login} />
		      <Route exact path="/login" component={Login} />
		      <Route exact path="/logout" component={Logout} />
		      <Route exact path="/signup" component={Signup} />
		      <NavRoute exact path="/home" component={Home} />
		      <NavRoute exact path="/scout/new" component={AddScout} />
		      <NavRoute exact path="/scout/:handle" component={EditScout} />
		      <NavRoute exact path="/user/edit" component={EditUser} />
			   <NavRoute exact path="/appliances" component={Appliances} />
			   <NavRoute exact path="/appliances/new" component={NewAppliance} />
			   <NavRoute exact path="/appliances/:handle" component={ApplianceDetail} />
			   <NavRoute component={Default} />
		    </Switch>
		  </Router>
		</React.Fragment>
        );
    }
}

export default App;
