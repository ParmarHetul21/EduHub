import { Component } from "react";
import {
	Form,
	Button,
	InputGroup,
	DropdownButton,
	Dropdown,
} from "react-bootstrap";

class Addsubjects extends Component {
	state = {
		subjectname: "",
		course: "MCA",
		semester: 0,
	};

	handlename = (e) => {
		this.setState({ subjectname: e.target.value });
		console.log(e.target.value);
	};

	handlesemester = (e) => {
		this.setState({ semester: e });
		console.log(e);
	};

	Addsubjects = (e, data) => {
		e.preventDefault();
		if (this.state.subjectname === "" && this.state.semester === 0) {
			alert("fields are empty");
		}
		fetch("http://127.0.0.1:8000/auth/addsubject/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `JWT ${localStorage.getItem("token")}`,
			},
			body: JSON.stringify(data),
		})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	render() {
		return (
			<div className="text" style={{ height: "580px" }}>
				<div className="bg_color_admin">
					<h4>Add Subjects</h4>
				</div>
				<div className="Login">
					<Form>
						<Form.Group size="lg" controlId="email">
							<Form.Label>subject name</Form.Label>
							<Form.Control
								autoFocus
								type="text"
								name="subjectname"
								onChange={(e) => {
									this.handlename(e);
								}}
								required
							/>
						</Form.Group>
						<br />
						<Form.Label>choose semester</Form.Label>
						<div>
							<InputGroup className="mb-3 input-group-lg">
								<DropdownButton
									variant="outline-secondary"
									title="semester"
									id="input-group-dropdown-2"
									name="semester"
									onSelect={(e) => {
										this.handlesemester(e);
									}}
									required
								>
									<Dropdown.Item href="#" eventKey="1">
										semester-1
									</Dropdown.Item>
									<Dropdown.Item href="#" eventKey="2">
										semester-2
									</Dropdown.Item>
									<Dropdown.Item href="#" eventKey="3">
										semester-3
									</Dropdown.Item>
									<Dropdown.Item href="#" eventKey="4">
										semester-4
									</Dropdown.Item>
								</DropdownButton>
							</InputGroup>
						</div>
						<br />
						<div className="text-center">
							<Button
								size="lg"
								type="submit"
								onClick={(e) => this.Addsubjects(e, this.state)}
							>
								Add
							</Button>
						</div>
					</Form>
				</div>
			</div>
		);
	}
}

export default Addsubjects;
