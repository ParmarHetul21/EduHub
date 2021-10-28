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
		whichUserToAdd:"student",
	}

	chooseUser = (e) => {
		console.log(e)
		this.setState({whichUserToAdd:e},()=>console.log("sdlkfnasl",this.state))
	}

	handleFileChange = (e) => {
		e.preventDefault();
		this.setState({fileToUpload:e.target.files[0]})
	}

	addUser = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append("file",this.state.fileToUpload);
		let url = "";
		if(this.state.whichUserToAdd==="faculty"){
			url = "http://127.0.0.1:8000/auth/addFaculties/";
		}
		else{
			url = "http://127.0.0.1:8000/auth/addStudents/";
		}
		fetch(url,
		{
			method: 'POST',
			headers: {
			  Authorization: `JWT ${localStorage.getItem("token")}`,
			},
			body: formData,	 
		}).then(res => res.json())
			.then(d => console.log(d))
	}
	
	render() {
		return (
			<div className="text" style={{ height: "580px" }}>
				<div className="bg_color_admin">
					<h4>Add Users</h4>
				</div>
				<div className="Login">
					<Form encType="">
	 					<Form.Label>Select User</Form.Label>
						<div>
							<InputGroup className="mb-3 input-group-lg">
								<DropdownButton
									variant="outline-secondary"
									title={this.state.whichUserToAdd}
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
