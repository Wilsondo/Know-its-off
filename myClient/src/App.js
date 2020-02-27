import React, {Component} from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import Appliances from './components/appliances';
import MyNavbar from './components/navbar';
import Users from './components/users';
import NewAppliance from './components/newAppliance';
import Default from './components/default';
import Login from './components/login';
import Signup from './components/signup';
import ApplianceDetail from './components/applianceDetail';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
/*
axios.defaults.baseURL =
  'https://web.engr.oregonstate.edu/cgi-bin/cgiwrap/~martinb3/know-its-off.cgi/api';
*/
axios.defaults.baseURL =
'https://know.pineapplepop.me/api';

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
		        <Route exact path="/signup" component={Signup} />
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
