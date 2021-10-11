import { Component } from "react";
import {
	Form,
	Button,
	InputGroup,
	DropdownButton,
	Dropdown,
} from "react-bootstrap";

class Addusers extends Component {
	render() {
		return (
			<div class="text" style={{ height: "580px" }}>
				<div className="bg_color_admin">
					<h4>Add Users</h4>
				</div>
				<div className="Login">
					<Form>
						<Form.Label>Select Batch</Form.Label>
						<div>
							<InputGroup className="mb-3 input-group-lg">
								<DropdownButton
									variant="outline-secondary"
									title="Batch"
									id="input-group-dropdown-2"
								>
									<Dropdown.Item href="#">
										2020-22
									</Dropdown.Item>
									<Dropdown.Item href="#">
										2018-20
									</Dropdown.Item>
									<Dropdown.Item href="#">
										2016-18
									</Dropdown.Item>
								</DropdownButton>
							</InputGroup>
						</div>

						<div>
							<Form.Group controlId="formFile" className="mb-3">
								<Form.Label>Upload CSV file here</Form.Label>
								<Form.Control type="file" />
							</Form.Group>
						</div>
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

export default Addusers;
