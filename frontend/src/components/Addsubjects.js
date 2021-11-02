import { Component } from "react";
import { Form, Button, Row, Col, FloatingLabel } from "react-bootstrap";
import Update from "../components/icons/Update.png";
import Delete from "../components/icons/Delete.png";

class Addsubjects extends Component {
  state = {
    subjectname: "",
    course: "MCA",
    semester: 0,
    subjects: [],
  };

  componentDidMount() {
    fetch("http://localhost:8000/auth/showsubject/", {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) =>
        this.setState({ subjects: data }, () => {
          console.log(this.state.subjects);
        })
      );
  }

  handlename = (e) => {
    this.setState({ subjectname: e.target.value });
    console.log(e.target.value);
  };

  handlesemester = (e) => {
    this.setState({ semester: e.target.value });
    console.log(e.target.value);
  };

  Addsubjects = (e, data) => {
    e.preventDefault();
    if (this.state.subjectname === "" || this.state.semester === 0) {
      alert("SubjectName or Semester fields are empty");
      return   
    }

    fetch("http://127.0.0.1:8000/auth/addsubject/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.Failure) {
          alert(data.Failure);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        fetch("http://localhost:8000/auth/showsubject/", {
          method: "GET",
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) =>
            this.setState({ subjects: data }, () => {
              console.log(this.state.subjects);
            })
          );
      });
  };
  deleteSubject = (subjectid) => {
    let formdata = new FormData();
    formdata.append("subjectID", subjectid);
    fetch(`http://localhost:8000/auth/deleteSubject/${subjectid}`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      body: formdata,
    })
      .then((res) => console.log(res))
      .then(() => {
        fetch(`http://localhost:8000/auth/showsubject/`, {
          method: "GET",
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            this.setState({ subjects: data }, () => {
              console.log(this.state.subjects);
            });
          })
          .catch((error) => console.error(error));
      });
  };
  render() {
    return (
      <div className="text" style={{ height: "580px" }}>
        <div className="bg_color_admin">
          <h4>Add Subjects</h4>
        </div>
        <Form className="container">
          <Row>
            <Col sm>
              <Form.Floating className="mb-3">
                <Form.Control
                  id="floatingInputCustom"
                  type="text"
                  placeholder="subject"
                  onChange={(e) => this.handlename(e)}
                />
                <label style={{ color: "grey" }} htmlFor="floatingInputCustom">
                  subject name
                </label>
              </Form.Floating>
            </Col>

            <Col sm>
              <FloatingLabel
                controlId="floatingSelectGrid"
                label="Select Semester"
                style={{ width: "220px" }}
              >
                <Form.Select
                  aria-label="Floating label select example"
                  title="semester"
                  id="input-group-dropdown-2"
                  name="semester"
                  onChange={(e) => {
                    this.handlesemester(e);
                  }}
                  required
                >
                  <option selected disabled hidden>
                    Select
                  </option>
                  <option value="1">semester-1</option>
                  <option value="2">semester-2</option>
                  <option value="3">semester-3</option>
                  <option value="4">semester-4</option>
                </Form.Select>
              </FloatingLabel>
            </Col>

            <Col sm>
              <Button
                size="lg"
                type="submit"
                style={{ marginTop: "4px" }}
                onClick={(e) => this.Addsubjects(e, this.state)}
              >
                Add
              </Button>
            </Col>
          </Row>
        </Form>

        <div className="faculty-subjectCard-header">
          <div style={{ flex: 1, marginLeft: "20px" }}>Subject</div>

          <div style={{ flex: 0.98 }}>Semester</div>

          <div style={{ flex: 0, marginRight: "40px" }}>Update</div>

          <div style={{ flex: 0, marginRight: "20px" }}>Delete</div>
        </div>

        {this.state.subjects.map((s) => (
          <div className="faculty-subjectCard" key={s.id}>
            <div style={{ flex: 1, marginLeft: "20px" }}>{s.subjectname}</div>

            <div style={{ flex: 0.98 }}>{s.semester}</div>

            <div style={{ flex: 0, marginRight: "70px" }}>
              <img src={Update} width="25" height="25" alt="Logo" />
            </div>

            <div style={{ flex: 0, marginRight: "40px" }}>
              <img
                src={Delete}
                width="25"
                height="25"
                alt="Logo"
                onClick={() => this.deleteSubject(s.id)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
        ))}
        <br></br>
        <br></br>
        <br></br>


      </div>
    );
  }
}

export default Addsubjects;
