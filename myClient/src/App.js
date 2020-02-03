import React, {Component} from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import Appliances from './components/appliances';
import MyNavbar from './components/navbar';
import Users from './components/users';
import Default from './components/default';
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
    render() {
        return (
		<React.Fragment>
		  <Router>
		    <MyNavbar />
		    <Switch>
			<Route exact path="/" component={Users} />
			<Route path="/appliances" component={Appliances} />
			<Route component={Default} />
		    </Switch>
		  </Router>
		</React.Fragment>
        );
    }
}

export default App;
