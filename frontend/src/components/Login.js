import { Component } from "react";
import "../App.css";
import EduHub from "../components/icons/ve-removebg-preview.png";
import { Form, Button } from "react-bootstrap";
class Login extends Component {
	render() {
		return (
			<div class="container-login">
				<div class="image">
					<img
						src={EduHub}
						width="500"
						height="auto"
						alt="Login"
						style={{ marginTop: "6px", padding: "30px" }}
					/>
				</div>
				<div class="text">
					<Form>
						<Form.Control
							size="lg"
							type="text"
							placeholder="Username"
							style={{
								background: "#1c2b4b",
								marginBottom: "15px",
								color: "white",
								width: "300px",
							}}
						/>

						<Form.Control
							size="lg"
							type="password"
							placeholder="Password"
							style={{
								background: "#1c2b4b",
								marginBottom: "15px",
								color: "white",
							}}
						/>

						<input
							className="btn btn-link"
							type="submit"
							value="Login"
							style={{
								marginLeft: "100px",
								textDecoration: "None",
								color: "black",
								fontSize: "25px",
							}}
						/>
					</Form>
				</div>
			</div>
		);
	}
}
export default Login;
