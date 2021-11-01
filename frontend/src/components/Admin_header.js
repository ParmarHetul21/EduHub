import { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import EduHub from "../components/icons/Main_Logo.png";
import UserIcon from "../components/icons/user_white.png";
import Addicon from "../components/icons/1_plus.png";
import "../App.css";
import { withRouter } from "react-router";

class Admin_header extends Component {
  state = {
    username: "",
    isLoggedIn: false,
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ isLoggedIn: true });
      this.setState({ username: localStorage.getItem("username") });
    } else {
      this.setState({ isLoggedIn: false });
    }
  }

  nextPath(path) {
    this.props.history.push(path);
  }

  render() {
    return (
      <div>
        <Navbar className="header" variant="dark" fixed="top">
          <Navbar.Brand className="p-1">
            <Link to="/admin_home">
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
            <>
              {/* <Link
                className="h5 px-3 text-light  text-decoration-none py-4"
                to="/"
              >
                Inquiries
              </Link> */}
              <Dropdown>
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
                    onClick={() => this.nextPath("/addsubjects")}
                  >
                    Add Subjects
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="text-decoration-none"
                    onClick={() => this.nextPath("/addusers")}
                  >
                    Add Users
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  className="text-decoration-none"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    marginTop: "17px",
                    marginRight: "10px",
                  }}
                >
                  <img src={UserIcon} height="25px" width="25px" alt="User" />
                </Dropdown.Toggle>

                <Dropdown.Menu
                  style={{ marginLeft: "-100px" }}
                  className="text-decoration-none"
                >
                  <Dropdown.Item className="text-decoration-none">
                    {this.state.username}
                  </Dropdown.Item>

                  <Dropdown.Item
                    className="text-decoration-none"
                    onClick={() => {
                      localStorage.clear();
                    }}
                  >
                    <Link to="/login" className="text-decoration-none">
                      Logout
                    </Link>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(Admin_header);
