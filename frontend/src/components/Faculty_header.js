import { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import EduHub from "../components/icons/Main_Logo.png";
import UserIcon from "../components/icons/user_white.png";
import "../App.css";

class Faculty_header extends Component {
  render() {
    return (
      <div>
        <Navbar className="header" variant="dark" fixed="top">
          <Navbar.Brand className="p-1">
            <Link to="/">
              <img
                src={EduHub}
                width="150"
                height="60"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>

          <Nav className="mr-auto">
            <Link
              className="h5 text-light px-3 text-decoration-none py-4"
              to="/"
            >
              Faculty
            </Link>

            <Link
              className="px-4 h5 text-light text-decoration-none"
              to="/login"
              onClick={() => localStorage.clear()}
              style={{ marginTop: "23px" }}
            >
              Logout
            </Link>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Faculty_header;
