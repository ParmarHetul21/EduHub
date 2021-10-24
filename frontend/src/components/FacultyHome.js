import { Component } from "react";
import "../App.css";

export default class FacultyHome extends Component {
  state = {
    semester: [1, 2, 3, 4],
    subjects: [],
  };
  componentDidMount() {
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
  render() {
    return (
      <>
        <div
          className="faculty-home-main"
          style={{ marginTop: "92px", display: "flex" }}
        >
          <div id="faculty-sidebar">
            {this.state.semester.map((s) => (
              <div className="sidebar-item">
                <h2 onClick={() => console.log(s)}>Semester - {s}</h2>
              </div>
            ))}
          </div>
          <div className="faculty-subject-card" style={{ position: "fixed" }}>
            <div
              className="f-card-deck"
              style={{
                marginTop: "20px",
                marginLeft: "280px",
                overflowX: "scroll",
                padding: "9px",
              }}
            >
              <div className="container-fluid">
                <div className="row  flex-nowrap">
                  {this.state.subjects.map((e) => (
                    <>
                      {e.map((d) => (
                        <div className="col-3" style={{ marginRight: "100px" }}>
                          <div className="fcard" style={{ height: "100px" }}>
                            <div className="card-body">
                              <h4 className="f-card-title">{d.subjectname}</h4>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
