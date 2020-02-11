import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class MyNavbar extends Component {
	render(){
		return(

<nav className="navbar navbar-expand-lg navbar-light bg-info">
  <Link to="/appliances" className="navbar-brand">Know It's Off</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <Link to="/appliances" className="nav-item nav-link active">Home </Link>
      <Link to="/appliances" className="nav-item nav-link">My appliances</Link>
      <Link to="/profile" className="nav-item nav-link">My profile</Link>
      <Link to="/" className="nav-item nav-link">Logout</Link>
    </div>
  </div>
</nav>
		)
	}
}

