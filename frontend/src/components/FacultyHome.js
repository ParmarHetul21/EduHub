import { Component } from "react";
import "../App.css";

export default class FacultyHome extends Component {
  state = {
    semester: [1, 2, 3, 4],
  };
  render() {
    return (
      <>
        <div id="faculty-sidebar">
          {this.state.semester.map((s) => (
            <div className="sidebar-item">
              <h2 onClick={() => console.log(s)}>Semester - {s}</h2>
            </div>
          ))}
        </div>
        <div className="faculty-subject-card">
          <div></div>
        </div>
      </>
    );
  }
}
