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
        let data = this.state.students.filter(s => s.semester === this.props.match.params.semester.split(":")[0] && s.batch === this.props.match.params.semester.split(":")[1])
  
        return <>   
           <div className="bg_color_admin" style={{width:"100%"}}>
            <h2>{`Semester - ${this.props.match.params.semester.split(":")[0]} (${this.props.match.params.semester.split(":")[1]})`}</h2>
            
          </div> 
          <div className="faculty-subjectCard-header" style={{marginTop:"10px",display:"flex",justifyContent:"center"}}>
          <div style={{ flex: 1, marginLeft: "20px" }}>EnrollmentNo</div>
            <div style={{ flex: 1, marginLeft: "20px" }}>Name</div>
            <div style={{ flex: 1, marginLeft: "20px" }}>ContactNo</div>

            <div style={{ flex: 0.98 }}>Email</div>


            <div style={{ flex: 0, marginRight: "40px" }}>Update</div>

            <div style={{ flex: 0, marginRight: "20px" }}>Delete</div>
          </div>
            {data.map(s => (
                <div className="faculty-subjectCard"> 
                <>
                <div style={{ flex: 1, marginLeft: "20px" }}>{s.enrollment}</div>
                
                <div style={{ flex: 1, marginLeft: "20px" }}>{s.first_name} {s.last_name}</div>
                
                <div style={{ flex: 1, marginLeft: "20px" }}>{s.mobile}</div>
                
                <div style={{ flex: 1.03, marginRight:"16px" }}>{s.email}</div>


                  <div style={{ flex: 0, marginRight: "60px" }}>
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