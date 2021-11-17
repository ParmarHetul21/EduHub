import { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import EduHub from "../components/icons/Main_Logo.png";
import Addicon from "../components/icons/1_plus.png";
import { withRouter } from "react-router";
import "../App.css";

class Header extends Component {
	state = {
		isLoggedIn: false
	};

	// for redirecting to the upload files and review file
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
							to="/"
						>
							Home
						</Link>

						{this.state.isLoggedIn ? (
							<>
								<Link
									className="h5 px-3 text-lightT  text-decoration-none py-4"
									to="/"
								>
									Inquiries
								</Link>
							</>
						) : (
							<>
								{localStorage.getItem("token") ? (
									<>
										<Dropdown>
											<Dropdown.Toggle
												variant="success"
												id="dropdown-basic"
												style={{
													backgroundColor:
														"transparent",
													border: "none",
													marginTop: "17px",
													marginRight: "10px"
												}}
											>
												<img
													src={Addicon}
													height="25px"
													wi
													dth="25px"
													alt="User"
												/>
											</Dropdown.Toggle>

											<Dropdown.Menu
												style={{ marginLeft: "-100px" }}
											>
												<Dropdown.Item
													className="text-decoration-none"
													onClick={() =>
														this.nextPath(
															"/studentFileUpload"
														)
													}
												>
													Upload Files
												</Dropdown.Item>
												<Dropdown.Item
													className="text-decoration-none"
													onClick={() =>
														this.nextPath(
															"/reviewfiles"
														)
													}
												>
													Review Files
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
							</>
						)}
					</Nav>
				</Navbar>
			</div>
		);
	}
}

export default withRouter(Header);
