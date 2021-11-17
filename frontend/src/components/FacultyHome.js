import { Component } from "react";
import "../App.css";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { Redirect } from "react-router";
import { DropdownButton, Dropdown } from "react-bootstrap";
export default class FacultyHome extends Component {
	state = {
		semester: [1, 2, 3, 4],
		selectedsemester: 1,
		isUser: false,
		subjects: [],
		selectedSubject: "",
		itemSubjects: [],
		checkedToggle: "",
		files: [],
		selectedFtype: ""
	};
	componentDidMount() {
		if (localStorage.getItem("id")) {
			var uid = localStorage.getItem("id");
		}
		//start fetching subjects
		fetch(`http://localhost:8000/auth/fetchSubject/${uid}`, {
			method: "GET",
			headers: {
				Authorization: `JWT ${localStorage.getItem("token")}`
			}
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.detail) {
					alert(data.detail);
					localStorage.clear();
				}
				this.setState({ subjects: data }, () =>
					console.log(this.state.subjects)
				);
			});
		//end fetching subjects

		//start fetching files
		fetch("http://localhost:8000/auth/fetchFiles/", {
			method: "GET",
			headers: {
				Authorization: `JWT ${localStorage.getItem("token")}`
			}
		})
			.then((res) => res.json())
			.then((data) =>
				this.setState({ files: data }, () => {
					console.log(this.state.files);
				})
			);
		//end fetching files
	}

	setSemester = (s) => {
		this.setState({ selectedsemester: s });
	};

	handleToggleStudent = (e) => {
		this.setState({ isUser: true, checkedToggle: "student" }, () => {
			console.log(this.state.checkedToggle);
		});
	};

	handleToggleFaculty = (e) =>
		this.setState({ isUser: false, checkedToggle: "faculty" });

	subjectFilter = (e) => {
		console.log(e.toString().split(":")[1]);
		this.setState({ selectedSubject: e });
	};

	setFileType = (e) => {
		console.log(e);
		this.setState({ selectedFtype: e });
	};

	render() {
		if (this.state.subjects.length >= 0) {
			var data = [];
			this.state.subjects.map((s) => s.map((d) => data.push(d)));
			var fdata = data.filter(
				(d) => d.semester === this.state.selectedsemester
			);
			var files = [];
			var d = this.state;

			if (d.checkedToggle === "faculty") {
				files = d.files.filter((f) => f.whichUser === "faculty");
			} else if (d.checkedToggle === "student") {
				files = d.files.filter((f) => f.whichUser === "student");
			} else if (d.selectedSubject !== "" && d.selectedFtype == "") {
				files = d.files.filter(
					(f) =>
						f.subjectID ==
						d.selectedSubject.toString().split(":")[1]
				);
			}
			//for file type and subject both together selected
			else if (d.selectedFtype == "ppt" && d.selectedSubject == "") {
				files = d.files.filter(
					(f) => f.fileName.toString().split(".")[1] == "pptx"
				);
			} else if (d.selectedFtype == "txt" && d.selectedSubject == "") {
				files = d.files.filter(
					(f) => f.fileName.toString().split(".")[1] == "txt"
				);
			} else if (d.selectedFtype == "pdf" && d.selectedSubject == "") {
				files = d.files.filter(
					(f) => f.fileName.toString().split(".")[1] == "pdf"
				);
			}
			//for only file type selection
			else if (d.selectedFtype == "ppt" && d.selectedSubject !== "") {
				files = d.files.filter(
					(f) =>
						f.fileName.toString().split(".")[1] == "pptx" &&
						f.subjectID ==
							d.selectedSubject.toString().split(":")[1]
				);
			} else if (d.selectedFtype == "txt" && d.selectedSubject !== "") {
				files = d.files.filter(
					(f) =>
						f.fileName.toString().split(".")[1] == "txt" &&
						f.subjectID ==
							d.selectedSubject.toString().split(":")[1]
				);
			} else if (d.selectedFtype == "pdf" && d.selectedSubject !== "") {
				files = d.files.filter(
					(f) =>
						f.fileName.toString().split(".")[1] == "pdf" &&
						f.subjectID ==
							d.selectedSubject.toString().split(":")[1]
				);
			}

			//else
			else {
				files = d.files;
			}
		}
		return (
			<>
				{!localStorage.getItem("token") ? (
					<Redirect to="/login" />
				) : (
					<div
						className="faculty-home-main"
						style={{
							marginTop: "92px",
							display: "flex",
							flexDirection: "column"
						}}
					>
						<div id="faculty-sidebar">
							{this.state.semester.map((s) => (
								<div className="sidebar-item" key={s}>
									<h2 onClick={() => this.setSemester(s)}>
										Semester - {s}
									</h2>
								</div>
							))}
						</div>

						<div
							style={{
								marginTop: "20px",
								marginLeft: "270px",
								display: "flex"
							}}
						>
							<ToggleButtonGroup type="checkbox">
								{this.state.checkedToggle === "student" ? (
									<ToggleButton
										id="tbg-btn-1"
										value={"Student"}
										style={{
											height: "36px",
											width: "170px",
											padding: "3px",
											color: "white",
											backgroundColor: "#1c2b4b"
										}}
										onClick={(e) =>
											this.handleToggleStudent(e)
										}
									>
										<h4>Student</h4>
									</ToggleButton>
								) : (
									<ToggleButton
										id="tbg-btn-1"
										value={"Student"}
										style={{
											height: "36px",
											width: "170px",
											padding: "3px",
											color: "grey",
											borderColor: "grey",
											backgroundColor: "transparent"
										}}
										onClick={(e) =>
											this.handleToggleStudent(e)
										}
									>
										<h4>Student</h4>
									</ToggleButton>
								)}

								{this.state.checkedToggle === "faculty" ? (
									<ToggleButton
										id="tbg-btn-2"
										value={"Faculty"}
										style={{
											height: "36px",
											width: "170px",
											padding: "3px",
											color: "white",
											borderColor: "grey",
											backgroundColor: "#1c2b4b"
										}}
										onClick={(e) =>
											this.handleToggleFaculty(e)
										}
										defaultChecked
									>
										<h4>Faculty</h4>
									</ToggleButton>
								) : (
									<ToggleButton
										id="tbg-btn-2"
										value={"Faculty"}
										style={{
											height: "36px",
											width: "170px",
											padding: "3px",
											color: "grey",
											borderColor: "grey",
											backgroundColor: "transparent"
										}}
										onClick={(e) =>
											this.handleToggleFaculty(e)
										}
										defaultChecked
									>
										<h4>Faculty</h4>
									</ToggleButton>
								)}
							</ToggleButtonGroup>

							<DropdownButton
								variant="outline-secondary"
								title="select subject"
								id="input-group-dropdown-2"
								style={{ marginLeft: "8px" }}
								onSelect={(e) => this.subjectFilter(e)}
							>
								{fdata.map((f) => (
									<Dropdown.Item
										eventKey={f.subjectname + ":" + f.id}
										key={f.id}
									>
										{f.subjectname}
									</Dropdown.Item>
								))}
							</DropdownButton>

							<DropdownButton
								variant="outline-secondary"
								title="select file"
								id="input-group-dropdown-2"
								style={{ marginLeft: "8px" }}
								onSelect={(e) => this.setFileType(e)}
							>
								<Dropdown.Item eventKey="pdf">
									pdf
								</Dropdown.Item>

								<Dropdown.Item eventKey="txt">
									txt
								</Dropdown.Item>

								<Dropdown.Item eventKey="ppt">
									ppt
								</Dropdown.Item>
							</DropdownButton>
						</div>

						<div
							style={{
								marginTop: "70px",
								marginLeft: "260px"
							}}
						>
							<div className="card-deck">
								<div className="container">
									<div className="grid" id="grid">
										{files.map((f) => (
											<div
												className="card"
												style={{ height: "100px" }}
												key={f.id}
											>
												<div
													className="card-body"
													style={{ padding: "10px" }}
												>
													<h4 className="card-title">
														{
															f.fileName.split(
																"."
															)[0]
														}
													</h4>
												</div>
											</div>
										))}
									</div>
									<br></br>
								</div>
							</div>
						</div>
					</div>
				)}
			</>
		);
	}
}
