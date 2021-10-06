import { Component } from "react";
import {Link} from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import EduHub from "../components/icons/Main_Logo.png";
import Login from "../components/Login";
import Body from "../components/Body";
import Footer from "../components/Footer";
import "../App.css";

class Header extends Component {
  render() {
    return (
      <div>

          <Navbar className="header" variant="dark" fixed="top">
            <Navbar.Brand href="#home" className="p-1">
              <img
                src={EduHub}
                width="150"
                height="60"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
            <Nav className="mr-auto">
            <Link className="h5 text-light" to="/">
                Home
              </Link>
             
              <Link className="px-4 h5 text-light" to="/login">
                Login
              </Link>
              {/* <NavDropdown
                className="h5 text-light"
                title="Dropdown"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar>
  

      </div>
    );
  }
}

export default Header;
