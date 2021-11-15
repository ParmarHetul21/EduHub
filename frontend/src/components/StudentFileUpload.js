import { Component } from "react";
import "../App.css";
import { Redirect } from "react-router";
import {
  Form,
  Button,
  InputGroup,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

export default class StudentFileUpload extends Component {
  state = {
    semester: [1, 2, 3, 4],
    subjects: [],
    selectedsemester: 1,
    isUser: false,
    selectedSubject: null,
    filename: "",
  };
  componentDidMount() {
    // console.log(localStorage.getItem("token"));
    if (localStorage.getItem("id")) {
      var uid = localStorage.getItem("id");
    }
    fetch(`http://localhost:8000/auth/showsubject/`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) =>
        this.setState({ subjects: data }, () =>
          console.log(this.state.subjects)
        )
      );
  }
  setSemester = (s) => {
    this.setState({ selectedsemester: s });
  };
  handleToggleStudent = () => {
    this.setState({ isUser: true });
    
  };
  handleToggleFaculty = () => {
    this.setState({ isUser: false });
  };
  uploadFile = (event) => {
    event.preventDefault();
    let data = new FormData(event.target);
    data.append("userID", localStorage.getItem("id"));
    data.append("subjectID", this.state.selectedSubject);
    data.append("fileName", this.state.filename);
    data.append("whichUser", localStorage.getItem("whichUser"));
    // console.log(data);
    fetch("http://localhost:8000/auth/uploadFile/", {
      method: "POST",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      body: data,
    })
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };
  changeValue = (e) => {
    this.setState({ selectedSubject: e });
  };
  render() {

    var subjects = this.state.subjects
    subjects = subjects.filter(s => (
        s.semester == this.state.selectedsemester
    ))
    
    return (
      <>
        {localStorage.getItem("token") === null ? (
          <Redirect to="/login" />
        ) : (
          <div
            className="faculty-home-main"
            style={{
              marginTop: "92px",
              display: "flex",
              flexDirection: "column",
            }}
               >
            <div
              className="Login"
              style={{ marginTop: "100px", marginLeft: "250px" }}
            >
              <Form encType="multi-part/formdata" onSubmit={this.uploadFile}>
                <Form.Label>Select Subject</Form.Label>
                <div>
                  <InputGroup className="mb-3 input-group-lg">
                    <DropdownButton
                      variant="outline-secondary"
                      title="Subject Name"
                      id="input-group-dropdown-2"
                      onSelect={(e) => this.changeValue(e)}
                    >
                      {subjects.map((f) => (
                        <Dropdown.Item key={f.id} eventKey={f.id}>
                          {f.subjectname}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>
                  </InputGroup>
                </div>

                <div>
                  <Form.Group
                    controlId="formFile"
                    accept=".csv"
                    className="mb-3"
                  >
                    <Form.Label>Upload File</Form.Label>
                    <Form.Control
                      type="file"
                      accept=".pdf, .pptx, .txt, .zip"
                      name="file"
                      onChange={(e) => {
                        this.setState(
                          { filename: e.target.files[0].name },
                          () => {
                            console.log(this.state.filename);
                          }
                        );
                        // console.log(e.target.files[0].name);
                      }}
                    />
                  </Form.Group>
                </div>
                <div className="text-center">
                  <Button size="lg" type="submit">
                    Add
                  </Button>
                </div>
              </Form>
            </div>
            <div id="faculty-sidebar">
              {this.state.semester.map((s) => (
                <div className="sidebar-item" key={s}>
                  <h2 onClick={() => this.setSemester(s)}>Semester - {s}</h2>
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  }
}
