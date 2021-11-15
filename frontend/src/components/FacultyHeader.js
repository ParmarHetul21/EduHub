import { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import EduHub from "../components/icons/Main_Logo.png";
import Addicon from "../components/icons/1_plus.png";
import "../App.css";
import { withRouter } from "react-router";

class Faculty_header extends Component {
  nextPath(path) {
    this.props.history.push(path);
  }
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
              to="/faculty_home"
            >
              Home
            </Link>
            <Dropdown style={{height:"80px"}}>
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    marginTop: "17px",
                    marginRight: "10px",
                  }}
                >
                  <img src={Addicon} height="25px" width="25px" alt="User" />
                </Dropdown.Toggle>

                <Dropdown.Menu
                  className="text-decoration-none"
                  style={{
                    marginLeft: "-100px",
                  }}
                >
                  <Dropdown.Item
                    className="text-decoration-none"
                    onClick={() => this.nextPath("/faculty_file_upload")}
                  >
                    Upload Files
                  </Dropdown.Item>

                  <Dropdown.Item
                    className="text-decoration-none"
                    onClick={() => this.nextPath("/fileApproval")}
                  >
                    File Requests
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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

export default withRouter(Faculty_header);
