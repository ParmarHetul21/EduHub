import { Component } from "react";
import { Row, Col, FloatingLabel, Form, Button } from "react-bootstrap";
import "../App.css";
import { withRouter } from "react-router";
import Update from "../components/icons/Update.png";
import Delete from "../components/icons/Delete.png";
class AssignSubject extends Component {
  state = {
    subjects: [],
    selectedsemester: 1,
    selectedsubject: null,
    uid: this.props.match.params.username.toString().split(":")[1],
    allocateSubjects: [],
  };

  componentDidMount() {
    fetch("http://127.0.0.1:8000/auth/showsubject/", {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => this.setState({ subjects: data }));
    fetch("http://127.0.0.1:8000/auth/showallocateSubjects/", {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => this.setState({ allocateSubjects: data }));
  }

  handleChange = (e) => {
    this.setState({
      selectedsemester: e.target.value,
    });
  };

  handleSubjectChange = (e) => {
    let s = this.state.subjects.filter((d) => d.subjectname === e.target.value);
    s.map((d) => {
      this.setState({
        selectedsubject: d.id,
      });
    });
  };

  allocateSubject = (e) => {
    console.log(this.state.selectedsemester);
    let formData = new FormData();
    formData.append("userID", this.state.uid);
    formData.append("subjectID", this.state.selectedsubject);

    fetch("http://127.0.0.1:8000/auth/allocateSubjects/", {
      method: "POST",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  render() {
    let data = this.state.subjects.filter(
      (d) => d.semester.toString() === this.state.selectedsemester.toString()
    );
    let alsubs = this.state.allocateSubjects.filter(
      (i) => i.userID == this.state.uid
    );
    return (
      <>
        <div className="text" style={{ height: "580px" }}>
          <div className="bg_color_admin">
            {/* <h1>
              {alsubs.map((d) => (
                <h1>{d.id}</h1>
              ))}
            </h1> */}
            <h2>{this.props.match.params.username.toString().split(":")[0]}</h2>
          </div>
          <div className="container">
            <Row className="d-flex justify-content-center">
              <Col sm>
                <FloatingLabel
                  controlId="floatingSelectGrid"
                  label="Select Semester"
                >
                  <Form.Select
                    aria-label="Floating label select example"
                    onChange={(e) => this.handleChange(e)}
                  >
                    <option value="1">semester-1</option>
                    <option value="2">semester-2</option>
                    <option value="3">semester-3</option>
                    <option value="4">semester-4</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              {/* {alsubs.map((i) => (
                <h1>{i.userID}</h1>
              ))} */}
              <Col sm style={{ marginLeft: "50px" }}>
                <FloatingLabel
                  controlId="floatingSelectGrid"
                  label="Select Subject"
                >
                  <Form.Select
                    aria-label="Floating label select example"
                    onChange={(e) => this.handleSubjectChange(e)}
                  >
                    {data.map((s) => (
                      <option value={s.subjectname} key={s.id}>
                        {s.subjectname}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Col>

              <Col sm>
                <Button
                  size="lg"
                  type="submit"
                  style={{ marginLeft: "50px", marginTop: "5px" }}
                  onClick={(e) => this.allocateSubject(e)}
                >
                  Add
                </Button>
              </Col>
            </Row>
          </div>
          <br></br>
          <div className="faculty-subjectCard-header">
            <div style={{ flex: 1, marginLeft: "20px" }}>Subject</div>

            <div style={{ flex: 0.98 }}>Semesters</div>

            <div style={{ flex: 0, marginRight: "40px" }}>Update</div>

            <div style={{ flex: 0, marginRight: "20px" }}>Delete</div>
          </div>

          <div className="faculty-subjectCard">
            <div style={{ flex: 1, marginLeft: "20px" }}>Data Science</div>

            <div style={{ flex: 1.03 }}>Semester-1</div>

            <div style={{ flex: 0, marginRight: "80px" }}>
              <img src={Update} width="25" height="25" alt="Logo" />
            </div>

            <div style={{ flex: 0, marginRight: "30px" }}>
              {" "}
              <img src={Delete} width="25" height="25" alt="Logo" />
            </div>
          </div>
          <div className="faculty-subjectCard">
            <div style={{ flex: 1, marginLeft: "20px" }}>Data Science</div>

            <div style={{ flex: 1.03 }}>Semester-1</div>

            <div style={{ flex: 0, marginRight: "80px" }}>
              <img src={Update} width="25" height="25" alt="Logo" />
            </div>

            <div style={{ flex: 0, marginRight: "30px" }}>
              <img src={Delete} width="25" height="25" alt="Logo" />
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default withRouter(AssignSubject);
