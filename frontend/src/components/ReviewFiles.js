import { Component } from "react";
import "../App.css";
import { Redirect } from "react-router";
import { DropdownButton, Dropdown } from "react-bootstrap";
import Open from "../components/icons/open.png";
import download from "../components/icons/download.png";

export default class ReviewFiles extends Component {
	state = {
		semester: [1, 2, 3, 4],
		selectedsemester: 1,
		isUser: false,
		subjects: [],
		selectedSubject: "",
		itemSubjects: [],
		checkedToggle: "",
		files: [],
		selectedFtype: "",
		selectedFStatus: ""
	};

	setFileStatus = (e) => {
		console.log(e);
		this.setState({ selectedFStatus: e });
	};

	downloadFile = (e, name, id) => {
		fetch(`http://localhost:8000/auth/downloadMaterial/${id}/`, {
			headers: {
				Authorization: `JWT ${localStorage.getItem("token")}`
			}
		}).then((response) => {
			response.blob().then((blob) => {
				console.log(response);
				let url = window.URL.createObjectURL(blob);
				let a = document.createElement("a");
				console.log(url);
				a.href = url;
				a.download = name;
				a.click();
			});
		});
	};

	componentDidMount() {
		//start fetching subjects
		fetch(`http://localhost:8000/auth/showsubject/`, {
			method: "GET",
			headers: {
				Authorization: `JWT ${localStorage.getItem("token")}`
			}
		})
			.then((res) => res.json())
			.then((data) => {
				this.setState({ subjects: data }, () =>
					console.log(this.state.subjects)
				);
			});
		//end fetching subjects

		var id = localStorage.getItem("id");
		//start fetching files
		fetch(`http://localhost:8000/auth/fetchAllFiles/${id}/`, {
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
		this.setState({ selectedsemester: s }, () => {});
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

	//approve file function
	approveFile = (e, id) => {
		//start fetching files
		fetch("http://localhost:8000/auth/fetchFileRequests/", {
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
	};

	render() {
		var data = [];
		// var subjects = this.state.subjects;
		this.state.subjects.map((s) => data.push(s));
		var fdata = data.filter(
			(d) => d.semester === this.state.selectedsemester
		);
		var files = [];
		var d = this.state;

		// if (d.checkedToggle === "faculty") {
		// 	files = d.files.filter((f) => f.whichUser === "faculty");
		// } else if (d.checkedToggle === "student") {
		// 	files = d.files.filter((f) => f.whichUser === "student");
		// } else if (d.selectedSubject !== "" && d.selectedFtype == "") {
		// 	files = d.files.filter(
		// 		(f) => f.subjectID == d.selectedSubject.toString().split(":")[1]
		// 	);
		// }

		// checking the condition for user and subjects

		//for file type and subject both together selected
		if (d.selectedFtype === "ppt" && d.selectedSubject === "") {
			files = d.files.filter(
				(f) => f.fileName.toString().split(".")[1] === "pptx"
			);
		} else if (d.selectedFtype === "txt" && d.selectedSubject === "") {
			files = d.files.filter(
				(f) => f.fileName.toString().split(".")[1] === "txt"
			);
		} else if (d.selectedFtype === "pdf" && d.selectedSubject === "") {
			files = d.files.filter(
				(f) => f.fileName.toString().split(".")[1] === "pdf"
			);
		}

		//for only file type selection
		else if (d.selectedFtype === "ppt" && d.selectedSubject !== "") {
			files = d.files.filter(
				(f) =>
					f.fileName.toString().split(".")[1] === "pptx" &&
					f.subjectID === d.selectedSubject.toString().split(":")[1]
			);
		} else if (d.selectedFtype === "txt" && d.selectedSubject !== "") {
			files = d.files.filter(
				(f) =>
					f.fileName.toString().split(".")[1] === "txt" &&
					f.subjectID === d.selectedSubject.toString().split(":")[1]
			);
		} else if (d.selectedFtype === "pdf" && d.selectedSubject !== "") {
			files = d.files.filter(
				(f) =>
					f.fileName.toString().split(".")[1] === "pdf" &&
					f.subjectID === d.selectedSubject.toString().split(":")[1]
			);
		} else if (this.state.selectedFStatus === "pending") {
			files = d.files.filter(
				(f) => f.isApproved === false && f.isRejected === false
			);
		} else if (this.state.selectedFStatus === "approved") {
			files = d.files.filter(
				(f) => f.isApproved === true && f.isRejected === false
			);
		} else if (this.state.selectedFStatus === "rejected") {
			files = d.files.filter(
				(f) => f.isApproved === false && f.isRejected === true
			);
		}

		//else
		else {
			files = d.files;
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
								marginLeft: "290px",
								display: "flex"
							}}
						>
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
								style={{ marginLeft: "25px" }}
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

							<DropdownButton
								variant="outline-secondary"
								title="file Status"
								id="input-group-dropdown-2"
								style={{ marginLeft: "25px" }}
								onSelect={(e) => this.setFileStatus(e)}
							>
								<Dropdown.Item eventKey="approved">
									approved
								</Dropdown.Item>

								<Dropdown.Item eventKey="pending">
									pending
								</Dropdown.Item>

								<Dropdown.Item eventKey="rejected">
									rejected
								</Dropdown.Item>
							</DropdownButton>
						</div>

						<br />
						<div style={{ marginLeft: "90px" }}>
							<div
								className="faculty-subjectCard-header"
								style={{ marginLeft: "250px", marginTop:"24px" }}
							>
								<h5 style={{ flex: 1, marginLeft: "45px" }}>
									FileName
								</h5>

								<h5 style={{ flex: 1, marginLeft: "180px" }}>
									Open file
								</h5>

								<h5 style={{ flex: 1, marginLeft: "220px" }}>
									Download File
								</h5>
							</div>

							{files.map((f) => (
								<div
									className="faculty-subjectCard"
									style={{ marginLeft: "280px" }}
									key={f.id}
								>
									<h5 style={{ flex: 1, marginLeft: "20px" }}>
										{f.fileName.split(".")[0]}
									</h5>
									<a
										href={`http://localhost:8000${f.file}`}
										target="_blank"
										rel="noopener noreferrer"
										style={{
											flex: 1,
											marginLeft: "20px",
											textDecoration: "none"
										}}
									>
										<img
											src={Open}
											width="25"
											height="25"
											alt="Logo"
											style={{
												marginLeft: "10px"
											}}
										/>
									</a>
									<h5
										style={{
											flex: 0.5,
											marginLeft: "70px",
											textDecoration: "none"
										}}
										onClick={(e) =>
											this.downloadFile(
												e,
												f.fileName.split(".")[0],
												f.id
											)
										}
									>
										<img
											src={download}
											width="25"
											height="25"
											alt="Logo"
											style={{
												marginLeft: "10px"
											}}
										/>
									</h5>
								</div>
							))}
							<br></br>
							<br></br>
						</div>
					</div>
				)}
			</>
		);
	}
}
