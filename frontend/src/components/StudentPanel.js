import { Component } from "react";
import "../App.css";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { Redirect, withRouter } from "react-router";
import { DropdownButton, Dropdown } from "react-bootstrap";
class StudentPanel extends Component {
  state = {
    subjects: [],
    checkedToggle: "",
    isUser: false,
  };
  componentDidMount() {
    fetch("http://localhost:8000/auth/showsubject/", {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => this.setState({ subjects: data }));
  }
  handleToggleStudent = (e) => {
    this.setState({ isUser: true, checkedToggle: "student" }, () => {
      console.log(this.state.checkedToggle);
    });
  };

  handleToggleFaculty = (e) =>
    this.setState({ isUser: false, checkedToggle: "faculty" });

  render() {
    var data = this.state.subjects.filter(
      (s) => s.semester == this.props.match.params.sem
    );
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
              flexDirection: "column",
            }}
          >
            <div id="student-sidebar">
              {data.map((s) => (
                <div className="ssidebar-item" key={s.id}>
                  <h4 style={{ paddingLeft: "15px" }}> {s.subjectname}</h4>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "20px",
                marginLeft: "270px",
                display: "flex",
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
                      backgroundColor: "#1c2b4b",
                    }}
                    onClick={(e) => this.handleToggleStudent(e)}
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
                      backgroundColor: "transparent",
                    }}
                    onClick={(e) => this.handleToggleStudent(e)}
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
                      backgroundColor: "#1c2b4b",
                    }}
                    onClick={(e) => this.handleToggleFaculty(e)}
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
                      backgroundColor: "transparent",
                    }}
                    onClick={(e) => this.handleToggleFaculty(e)}
                    defaultChecked
                  >
                    <h4>Faculty</h4>
                  </ToggleButton>
                )}
              </ToggleButtonGroup>

              <DropdownButton
                variant="outline-secondary"
                title="select file"
                id="input-group-dropdown-2"
                style={{ marginLeft: "8px" }}
                onSelect={(e) => this.setFileType(e)}
              >
                <Dropdown.Item eventKey="pdf">pdf</Dropdown.Item>

                <Dropdown.Item eventKey="txt">txt</Dropdown.Item>

                <Dropdown.Item eventKey="ppt">ppt</Dropdown.Item>
              </DropdownButton>
            </div>

            <div
              style={{
                marginTop: "70px",
                marginLeft: "260px",
              }}
            >
              <div className="card-deck">
                <div className="container">
                  <div className="grid" id="grid">
                    {/* {files.map((f) => (
                      <div
                        className="card"
                        style={{ height: "100px" }}
                        key={f.id}
                      >
                        <div className="card-body" style={{ padding: "10px" }}>
                          <h4 className="card-title">
                            {f.fileName.split(".")[0]}
                          </h4>
                        </div>
                      </div>
                    ))} */}
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

export default withRouter(StudentPanel);
