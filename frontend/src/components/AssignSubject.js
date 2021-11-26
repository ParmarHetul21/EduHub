import { Component } from "react";
import { Row, Col, FloatingLabel, Form, Button } from "react-bootstrap";
import "../App.css";
import { withRouter } from "react-router";
import Update from "../components/icons/Update.png";
import Delete from "../components/icons/Delete.png";

class AssignSubject extends Component {
  state = {
    subjects: [],
    selectedBatch: "",
    selectedsemester: 1,
    selectedsubject: null,
    uid: this.props.match.params.username.toString().split(":")[1],
    allocateSubjects: [],
    fetchedSubjects: [],
  };

  async componentDidMount() {
    await fetch("http://127.0.0.1:8000/auth/showsubject/", {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ subjects: data });
      });
    await fetch("http://127.0.0.1:8000/auth/showallocateSubjects/", {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) =>
        this.setState({ allocateSubjects: data }, () => {
          console.log(this.state.allocateSubjects);
        })
      );

    await fetch(`http://localhost:8000/auth/fetchSubject/${this.state.uid}`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ fetchedSubjects: data }, () => {
          console.log(this.state.fetchedSubjects);
        });
      })
      .catch((error) => console.error(error));
  }

  handleChange = (e) => {
    this.setState({
      selectedsemester: e.target.value,
    });
  };
  handleBatchChange = (e) => {
    this.setState({
      selectedBatch: e.target.value,
    });
  };
  handleSubjectChange = (e) => {
    let s = this.state.subjects.filter((d) => d.subjectname === e.target.value);
    s.map((d) =>
      this.setState(
        {
          selectedsubject: d.id,
        },
        () => {
          console.log("selectedsubject" + this.state.selectedsubject);
        }
      )
    );
  };

  allocateSubject = (e) => {
    console.log(this.state.selectedsemester);
    let formData = new FormData();

    formData.append("userID", this.state.uid);
    formData.append("subjectID", this.state.selectedsubject);
    console.log("State" + this.state.selectedsubject);
    fetch("http://127.0.0.1:8000/auth/allocateSubjects/", {
      method: "POST",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.Failure) {
          alert(data.Failure);
        }
      })
      .catch((error) => alert(error));
    setTimeout(() => {
      fetch(`http://localhost:8000/auth/fetchSubject/${this.state.uid}`, {
        method: "GET",
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({ fetchedSubjects: data }, () => {
            console.log(this.state.fetchedSubjects);
          });
        })
        .catch((error) => console.error(error));
    }, 100);
  };
  deleteSubject = (e, userid, subjectid) => {
    let formdata = new FormData();
    formdata.append("userID", userid);
    formdata.append("subjectID", subjectid);
    fetch(
      `http://localhost:8000/auth/deleteallocatedSubjects/${userid}/${subjectid}`,
      {
        method: "POST",
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
        body: formdata,
      }
    )
      .then((res) => console.log(res))
      .then(() => {
        fetch(`http://localhost:8000/auth/fetchSubject/${this.state.uid}`, {
          method: "GET",
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            this.setState({ fetchedSubjects: data }, () => {
              console.log(this.state.fetchedSubjects);
            });
          })
          .catch((error) => console.error(error));
      });
  };
  render() {
    let data = this.state.subjects.filter(
      (d) =>
        d.semester.toString() === this.state.selectedsemester.toString() &&
        d.batch.toString() === this.state.selectedBatch.toString()
    );

    return (
      <>
        <div className="text" style={{ height: "580px" }}>
          <div className="bg_color_admin">
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
                    {" "}
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
              {/* {alsubs.map((i) => (
                <h1>{i.userID}</h1>
              ))} */}

              <Col sm>
                <FloatingLabel
                  controlId="floatingSelectGrid"
                  label="Select Batch"
                  style={{ width: "220px" }}
                >
                  <Form.Select
                    aria-label="Floating label select example"
                    title="Batch"
                    id="input-group-dropdown-2"
                    name="batch"
                    onChange={(e) => {
                      this.handleBatchChange(e);
                    }}
                    required
                  >
                    <option selected disabled hidden>
                      Select
                    </option>
                    <option value="2016-18">2016-18</option>
                    <option value="2018-20">2018-20</option>
                    <option value="2020-22">2020-22</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>

              <Col sm style={{ marginLeft: "50px" }}>
                <FloatingLabel
                  controlId="floatingSelectGrid"
                  label="Select Subject"
                >
                  <Form.Select
                    aria-label="Floating label select example"
                    onChange={(e) => this.handleSubjectChange(e)}
                  >
                    <option selected disabled hidden>
                      Select
                    </option>
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
                  style={{
                    marginLeft: "50px",
                    marginTop: "5px",
                  }}
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
          {this.state.fetchedSubjects.map((e) => (
            <div className="faculty-subjectCard">
              {e.map((f) => (
                <>
                  <div style={{ flex: 1, marginLeft: "20px" }} key={f.id}>
                    {f.subjectname}
                  </div>

                  <div style={{ flex: 1.03 }}>Semester-{f.semester}</div>

                  <div style={{ flex: 0, marginRight: "80px" }}>
                    <img src={Update} width="25" height="25" alt="Logo" />
                  </div>

                  <div style={{ flex: 0, marginRight: "30px" }}>
                    {" "}
                    <img
                      src={Delete}
                      width="25"
                      height="25"
                      alt="Logo"
                      onClick={(e) =>
                        this.deleteSubject(e, this.state.uid, f.id)
                      }
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </>
              ))}
            </div>
          ))}
          <br></br>
          <br></br>
          <br></br>
        </div>
      </>
    );
  }
}
export default withRouter(AssignSubject);
