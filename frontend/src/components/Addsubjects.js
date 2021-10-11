import { Component } from "react";
import {
	Form,
	Button,
	InputGroup,
	DropdownButton,
	Dropdown,
} from "react-bootstrap";

class Addsubjects extends Component {
	render() {
		return (
			<div class="text" style={{ height: "580px" }}>
				<div className="bg_color_admin">
					<h4>Add Subjects</h4>
				</div>
				<div className="Login">
					<Form>
						<Form.Group size="lg" controlId="email">
							<Form.Label>subject name</Form.Label>
							<Form.Control autoFocus type="email" />
						</Form.Group>
						<br />
						<Form.Label>choose semester</Form.Label>
						<div>
							<InputGroup className="mb-3 input-group-lg">
								<DropdownButton
									variant="outline-secondary"
									title="Semesters"
									id="input-group-dropdown-2"
								>
									<Dropdown.Item href="#">
										semester-1
									</Dropdown.Item>
									<Dropdown.Item href="#">
										semester-2
									</Dropdown.Item>
									<Dropdown.Item href="#">
										semester-3
									</Dropdown.Item>
									<Dropdown.Item href="#">
										semester-4
									</Dropdown.Item>
								</DropdownButton>
							</InputGroup>
						</div>
						<br />
						<div className="text-center">
							<Button size="lg" type="submit">
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
