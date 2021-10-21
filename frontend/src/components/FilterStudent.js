import { Component } from "react";
import Update from "../components/icons/Update.png";
import Delete from "../components/icons/Delete.png";
import { withRouter } from "react-router";

class FilterStudent extends Component{
    
    state={
        students:[]
    }
    componentDidMount(){
        fetch("http://127.0.0.1:8000/auth/fetchStudents/",{
            method:"GET",
            headers: {
                Authorization: `JWT ${localStorage.getItem("token")}`,
              }
        }).then(res => res.json()).then(data => this.setState({students:data}))
    }

    render(){
        let data = this.state.students.filter(s => s.semester == this.props.match.params.semester)
        return <>   
           <div className="bg_color_admin" style={{width:"100%"}}>
            <h2>{`Semester - ${this.props.match.params.semester}`}</h2>
          </div> 
          <div className="faculty-subjectCard-header" style={{marginTop:"10px",display:"flex",justifyContent:"center"}}>
            <div style={{ flex: 1, marginLeft: "20px" }}>name</div>

            <div style={{ flex: 0.98 }}>Email</div>

            {/* <div style={{ flex: 0.98 }}>Semester</div> */}

            <div style={{ flex: 0, marginRight: "40px" }}>Update</div>

            <div style={{ flex: 0, marginRight: "20px" }}>Delete</div>
          </div>
            {data.map(s => (
                <div className="faculty-subjectCard"> 
                <>
                  <div style={{ flex: 1, marginLeft: "20px" }}>
                    {s.username}
                  </div>

                  <div style={{ flex: 1.03 }}>{s.email}</div>


                  {/* <div style={{ flex: 1.03 }}>{s.semester}</div> */}

                  <div style={{ flex: 0, marginRight: "80px" }}>
                    <img src={Update} width="25" height="25" alt="Logo" />
                  </div>

                  <div style={{ flex: 0, marginRight: "30px" }}>
                    {" "}
                    <img src={Delete} width="25" height="25" alt="Logo" />
                  </div>
                </>
            
            </div>   
            ))}
             
        </>
    }
}
export default withRouter(FilterStudent);