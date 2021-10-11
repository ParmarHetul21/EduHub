import { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import EduHub from "../components/icons/Main_Logo.png";
import UserIcon from "../components/icons/user_white.png";
import "../App.css";

class Header extends Component {
	state = {
		isLoggedIn: false,
	};

	componentDidMount() {
		// setTimeout(() => {
		// 	if (localStorage.getItem("token")) {
		// 		this.setState({ isLoggedIn: true });
		// 	}
		// }, 1000);
		console.log(localStorage.getItem("username"));
		console.log(localStorage.getItem("token"));
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
							to="/"
						>
							Home
						</Link>
						{this.state.isLoggedIn ? (
							<>
								<Link
									className="h5 px-3 text-light  text-decoration-none py-4"
									to="/"
								>
									Inquiries
								</Link>
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
										<img
											src={UserIcon}
											height="30px"
											width="30px"
											alt="User"
										/>
									</Dropdown.Toggle>

									<Dropdown.Menu
										style={{ marginLeft: "-100px" }}
									>
										<Dropdown.Item href="#/action-1">
											Action
										</Dropdown.Item>
										<Dropdown.Item href="#/action-2">
											Another action
										</Dropdown.Item>
										<Dropdown.Item href="#/action-3">
											Something else
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
							</>
						) : (
							<Link
								className="px-4 h5 text-light text-decoration-none"
								to="/login"
								style={{ marginTop: "23px" }}
							>
								Login
							</Link>
						)}
					</Nav>
				</Navbar>
			</div>
		);
	}
}

export default Header;
