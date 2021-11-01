import { Component } from "react";
import "../App.css";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { Redirect } from "react-router";
import { DropdownButton, Dropdown } from "react-bootstrap";
export default class FacultyHome extends Component {
  state = {
    semester: [1,2,3,4],
    selectedsemester: 1,
    isUser: false,
    subjects: [],
    selectedSubject: "choose subject",
    itemSubjects: [],
    checkedToggle:"",
    files:[],
    selectedFtype: "choose file type"
  };
  componentDidMount() {
    if (localStorage.getItem("id")) {
      var uid = localStorage.getItem("id");
    }
    //start fetching subjects
    fetch(`http://localhost:8000/auth/fetchSubject/${uid}`, {
      method: "GET",
      headers: {
        Authorization: `JWT ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.detail){
          alert(data.detail)
          localStorage.clear()
        }
        this.setState({ subjects: data }, () =>
          console.log(this.state.subjects)
        )
      }
      );
      //end fetching subjects

      //start fetching files
      fetch("http://localhost:8000/auth/fetchFiles/",{
      method:"GET",
      headers:{
        Authorization: `JWT ${localStorage.getItem("token")}`
      }
        }).then(res => res.json())
        .then(data => this.setState({files:data},()=>{
          console.log(this.state.files)
        }))
      //end fetching files
  }

  setSemester = (s) => {
    this.setState({ selectedsemester: s });
  };

  handleToggleStudent = (e) => {
    this.setState({ isUser: true, checkedToggle:"student"},()=>{
      console.log(this.state.checkedToggle)
    });
    
  };

  handleToggleFaculty = (e) => this.setState({ isUser: false, checkedToggle:"faculty" });
  

  subjectFilter = (e) => {
    // console.log(e.toString().split(":")[1])
    this.setState({selectedSubject:e})
  } 
  

  setFileType = (e) => this.setState({selectedFtype: e})
  
  

  render() {
    if(this.state.subjects.length >= 0){
      var data = [];
      this.state.subjects.map((s) => s.map((d) => data.push(d)));
      var fdata = data.filter((d) => d.semester === this.state.selectedsemester);
      var files = []
      var d = this.state 
  
      if(d.checkedToggle === "faculty"){
        files = d.files.filter(f => f.whichUser==="faculty")
      }
      else if(d.checkedToggle === "student"){
        files = d.files.filter(f => f.whichUser==="student")
      }
      else if (d.selectedSubject !== null){
        files = d.files.filter(f => f.subjectID.toString() === d.selectedSubject.toString().split(":")[1])
      }
      else if(d.selectedFtype !== null){
         if(d.selectedFtype === "pdf"){
          files = d.files.filter(f => (
            f.fileName.toString().split(".")[1] === "pdf"
          ))
        }
        else if(d.selectedFtype === "ppt"){
          files = d.files.filter(f => (
            f.fileName.toString().split(".")[1] === "pptx" || f.fileName.toString().split(".")[1] === "ppt"
          ))
        }
        else if(d.selectedFtype === "txt"){
          files = d.files.filter(f => (
            f.fileName.toString().split(".")[1] === "txt"
          ))
        }
      }
      else{
        files = d.files
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
              flexDirection: "column",
            }}
          >

            <div id="faculty-sidebar">
              {this.state.semester.map((s) => (
                <div className="sidebar-item" key={s}>
                  <h2 onClick={() => this.setSemester(s)}>Semester - {s}</h2>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "20px",
                marginLeft: "270px",
                display:"flex",

              }}
            >
              <ToggleButtonGroup type="checkbox" >

            {this.state.checkedToggle === "student" ? 
            <ToggleButton

            id="tbg-btn-1"
            value={"Student"}
            style={{
              height: "36px",
              width: "170px",
              padding:"3px",
              color:"white",
              backgroundColor: "#1c2b4b",
            }}

            onClick={(e) => this.handleToggleStudent(e)}
          >
            <h4>Student</h4>
          </ToggleButton> : 
          <ToggleButton

          id="tbg-btn-1"
          value={"Student"}
          style={{
            height: "36px",
            width: "170px",
            padding:"3px",
            color:"grey",
            borderColor:"grey",
            backgroundColor: "transparent",
          }}

          onClick={(e) => this.handleToggleStudent(e)}
        >
          <h4>Student</h4>
        </ToggleButton>}
                
        {this.state.checkedToggle === "faculty" ?
                     <ToggleButton
                     id="tbg-btn-2"
                     value={"Faculty"}
                     style={{
                       height: "36px",
                       width: "170px",
                       padding:"3px",
                       color:"white",
                       borderColor:"grey",
                       backgroundColor: "#1c2b4b",
                     }}
                     onClick={(e) => this.handleToggleFaculty(e)}
                   defaultChecked>
                     <h4>Faculty</h4>
                   </ToggleButton>:
                <ToggleButton
                  id="tbg-btn-2"
                  value={"Faculty"}
                  style={{
                    height: "36px",
                    width: "170px",
                    padding:"3px",
                    color:"grey",
                    borderColor:"grey",
                    backgroundColor: "transparent",
                  }}
                  onClick={(e) => this.handleToggleFaculty(e)}
                defaultChecked>
                  <h4>Faculty</h4>
                </ToggleButton>
        }
              </ToggleButtonGroup>

             
                    <DropdownButton
                      variant="outline-secondary"
                      title={this.state.selectedSubject.toString().split(":")[0]}
                      id="input-group-dropdown-2"
                      style={{marginLeft:"8px"}}
                      onSelect={(e)=>this.subjectFilter(e)}
                    >
                      {fdata.map((f) => (
                        <Dropdown.Item  eventKey={f.subjectname+":"+f.id} key={f.id}>
                          {f.subjectname}
                        </Dropdown.Item>
                      ))}
                    </DropdownButton>

                    <DropdownButton
                      variant="outline-secondary"
                      title={this.state.selectedFtype}
                      id="input-group-dropdown-2"
                      style={{marginLeft:"8px"}}
                      onSelect={(e) => this.setFileType(e)}
                    >
                      
                        <Dropdown.Item eventKey="pdf" >
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
                marginLeft: "260px",
              }}
            >
               <div className="card-deck">
                  <div className="container">
                    <div className="grid" id="grid">
                            
                        {files.map( f => (
                            <div className="card" style={{ height: "100px" }} key={f.id}>
                             
                                <div className="card-body" style={{padding:"10px"}}>
                                <h4 className="card-title" >{f.fileName.split(".")[0]}</h4>
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
