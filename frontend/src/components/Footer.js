import { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../App.css";
class Footer extends Component {
  render() {
    return (
      <footer className="footer mt-auto py-3">
        <div className="container d-inline-flex justify-content-between">
          <span className="text-light h5">
            {" "}
            © EduHub - 2021 All rights reserved
          </span>
          <span className="text-light h5"> Contact Us</span>
        </div>
      </footer>
    );
  }
}

export default Footer;
