import { Component } from "react";
import {
	Form,
	Button,
	InputGroup,
	DropdownButton,
	Dropdown,
} from "react-bootstrap";

class Addusers extends Component {
	state = {
		whichUserToAdd:"",
		file:null
	}

	chooseUser = (e) => {
		console.log(e)
		this.setState({whichUserToAdd:e},()=>console.log("sdlkfnasl",this.state))
	}

	handleFileChange = (e) => {
		console.log(e.target.files)
		this.setState({file:e.target.files[0]})
	}

	addUser = (e) => {
		e.preventDefault();
		// let formData = new FormData();
		// formData.append("file",this.state.file);
		// let formData = {
		// 	"file": this.state.file
		// }
		fetch("http://127.0.0.1:8000/auth/addStudents/",
		{
			method: 'POST',
			headers: {
			  'content-type': 'application/json',
			  Authorization: `JWT ${localStorage.getItem("token")}`,
			},
			 
		}
		).then(res => res.json())
			.then(d => console.log(d))
	}
	
	render() {
		return (
			<div className="text" style={{ height: "580px" }}>
				<div className="bg_color_admin">
					<h4>Add Users</h4>
				</div>
				<div className="Login">
					<Form>
	 					<Form.Label>Select User</Form.Label>
						<div>
							<InputGroup className="mb-3 input-group-lg">
								<DropdownButton
									variant="outline-secondary"
									title="User Type"
									id="input-group-dropdown-2"
									onSelect={(e) => {
										this.chooseUser(e);
									}}
								>
									<Dropdown.Item eventKey="faculty">
										Faculty
									</Dropdown.Item>
									<Dropdown.Item eventKey="student">
										Student
									</Dropdown.Item>
								</DropdownButton>
							</InputGroup>
						</div>

						<div>
							<Form.Group controlId="formFile" accept=".csv" onChange={(e)=>this.handleFileChange(e)} className="mb-3">
								<Form.Label>Upload CSV file here</Form.Label>
								<Form.Control type="file" />
							</Form.Group>
						</div>
						<div className="text-center">
							<Button size="lg" type="submit" onClick={(e)=>this.addUser(e)}>
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
