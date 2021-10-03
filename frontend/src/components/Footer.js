import { Component } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../App.css";
class Footer extends Component {
	render() {
		return (
			<div>
				{/* <Navbar bg="dark" variant="dark" expand="lg">
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
					<Nav>
						<Nav.Link
							className="footer-copyright text-center py-3"
							style={{ color: "white", textAlign: "center" }}
							href="/"
						>
							© EduHub - 2021. All rights reserved.
						</Nav.Link>
					</Nav>
					<Nav className="mr-auto">
						<Nav.Link style={{ color: "white" }} href="/">
							Contact Us
						</Nav.Link>
					</Nav>
				</Navbar> */}
				{/* <div className="footer-copyright text-center py-3">
					<MDBContainer fluid>
						&copy; {new Date().getFullYear()} Copyright:{" "}
						<a href="https://www.mdbootstrap.com">
							{" "}
							MDBootstrap.com{" "}
						</a>
					</MDBContainer>
				</div> */}

				<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
					<Container
						style={{ display: "flex", justifyContent: "center" }}
					>
						<Nav>
							<Nav.Link
								style={{
									color: "white",
									paddingRight: "250px",
								}}
							>
								&copy; EduHub - 2021. All rights reserved
							</Nav.Link>
							<Nav.Link
								style={{
									paddingLeft: "510px",
									color: "white",
								}}
							>
								Contact-Us
							</Nav.Link>
						</Nav>
					</Container>
				</Navbar>
			</div>
		);
	}
}

export default Footer;
