import { Component } from "react";
import "../App.css";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { Redirect } from "react-router";

export default class FacultyHome extends Component {
  state = {
    semester: [1, 2, 3, 4],
    subjects: [],
    selectedsemester: 1,
    isUser: false,
  };
  componentDidMount() {
    // console.log(localStorage.getItem("token"));
    if (localStorage.getItem("id")) {
      var uid = localStorage.getItem("id");
    }
    fetch(`http://localhost:8000/auth/fetchSubject/${uid}`, {
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
  render() {
    var data = [];
    this.state.subjects.map((s) => s.map((d) => data.push(d)));
    var fdata = data.filter((d) => d.semester == this.state.selectedsemester);

    return (
      <>
        {localStorage.getItem("token") == null ? (
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
            <div className="faculty-subject-card" style={{ position: "fixed" }}>
              <div
                className="f-card-deck"
                style={{
                  width: "1200px",
                  marginTop: "20px",
                  marginLeft: "280px",
                  overflowX: "scroll",
                  padding: "9px",
                }}
              >
                <div className="container-fluid">
                  <div className="row  flex-nowrap">
                    {fdata.map((d) => (
                      <div className="col-3" style={{ margin: "auto" }}>
                        <div className="fcard" style={{ height: "100px" }}>
                          <div className="card-body">
                            <h4 className="f-card-title">{d.subjectname}</h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div id="faculty-sidebar">
              {this.state.semester.map((s) => (
                <div className="sidebar-item">
                  <h2 onClick={() => this.setSemester(s)}>Semester - {s}</h2>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: "160px",
                marginLeft: "680px",
              }}
            >
              <ToggleButtonGroup type="checkbox">
                <ToggleButton
                  id="tbg-btn-1"
                  value={"Student"}
                  style={{
                    height: "50px",
                    width: "200px",
                    backgroundColor: "#1c2b4b",
                  }}
                  onClick={(e) => this.handleToggleStudent(e)}
                >
                  <h2>Student</h2>
                </ToggleButton>
                <ToggleButton
                  id="tbg-btn-2"
                  value={"Faculty"}
                  style={{
                    height: "50px",
                    width: "200px",
                    backgroundColor: "#1c2b4b",
                  }}
                  onClick={(e) => this.handleToggleFaculty(e)}
                >
                  <h2>Faculty</h2>
                </ToggleButton>
              </ToggleButtonGroup>
                  
            </div>

            <div
              style={{
                marginTop: "25px",
                marginLeft: "170px",
              }}
            >
              {this.state.isUser ? (
                <div className="faculty-subjectCard-header">
                  <div
                    style={{
                      flex: 1,
                      marginLeft: "20px",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    File Name
                  </div>

                  <div
                    style={{ flex: 0.98, fontWeight: "bold", fontSize: "20px" }}
                  >
                    Upload Time
                  </div>

                  <div
                    style={{
                      flex: 0.2,
                      marginRight: "40px",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    Accept
                  </div>

                  <div
                    style={{
                      flex: 0,
                      marginRight: "20px",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    Reject
                  </div>
                </div>
              ) : (
                <div className="faculty-subjectCard-header">
                  <div
                    style={{
                      flex: 1,
                      marginLeft: "20px",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    File Name
                  </div>

                  <div
                    style={{ flex: 0.98, fontWeight: "bold", fontSize: "20px" }}
                  >
                    Upload Time
                  </div>

                  <div
                    style={{
                      flex: 0.3,
                      marginRight: "50px",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    Faculty Name
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}
