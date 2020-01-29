import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Navbar, Nav, Form, Button, FormControl} from 'react-bootstrap';

export default class MyNavbar extends Component {
	render(){
		return(

<Navbar bg="dark" expand="lg">
  <Navbar.Brand><Link to="/">Know it&#8217;s off</Link></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link><Link to="/">Home</Link></Nav.Link>
      <Nav.Link><Link to="/appliances">My Appliances</Link></Nav.Link>
      <Nav.Link><Link to="/logout">Logout</Link></Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>

		)
	}
}

