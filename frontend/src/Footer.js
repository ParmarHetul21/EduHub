import { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import EduHub from "./icons/Main_Logo.png";
import "./App.css";
class Footer extends Component {
  render() {
    return (
      <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
                
                <Nav className="justify-content-center">
                    <Nav.Link style={{ color: "white"}} href="/">© EduHub - 2021. All rights reserved.</Nav.Link>
                </Nav>
                <Nav className="mr-auto">
                    <Nav.Link style={{ color: "white" }} href="/">Contact Us</Nav.Link>
                </Nav>
                </Navbar>
      </div>
    );
  }
}

export default Footer;