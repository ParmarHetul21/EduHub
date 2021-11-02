import { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import FilterStudBysem from "./FilterStudBySem";
class Admin_Home extends Component {
  state = {
    isToggle: true,
    isLoggedIn: false,
    faculty: [],
    selectedBatch:"2020-22"
  };

  handleToggle = (e) => {
    let data = e.target.innerText;
    if (data === "faculty") {
      this.setState({ isToggle: false });
    }

    if (data === "student") {
      this.setState({ isToggle: true });
    }
  };

  componentDidMount() {
    fetch("http://127.0.0.1:8000/auth/fetchFaculties/", {
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
        this.setState({ faculty: data }, () => {
          console.log(this.state.faculty);
        })
      }
      );
  }

  setBatch = (e) => {
    this.setState({selectedBatch: e})
  }

  render() {
    return (
      <>
        {!localStorage.getItem("token") ? (
          <Redirect to="/login" />
        ) : (
          <div>
            <div
              className=" d-flex justify-content-between"
              style={{
                marginTop: "120px",
                marginLeft: "40px",
              }}
            >
              <ToggleButtonGroup
                type="checkbox"
                style={{
                  justifyContent: "flex-start",
                }}
              >
                <ToggleButton
                  id="tbg-btn-1"
                  value={"Student"}
                  onClick={(e) => this.handleToggle(e)}
                >
                  student
                </ToggleButton>
                <ToggleButton
                  id="tbg-btn-2"
                  value={"Faculty"}
                  onClick={(e) => this.handleToggle(e)}
                >
                  faculty
                </ToggleButton>
              </ToggleButtonGroup>
             
            </div>
            
            {this.state.isToggle ? (
              <>
              <div style={{flex:0, marginLeft:"80px"}}>
        <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "black",
                    marginRight: "30px",
                    float:"right"
                  }}
                >
                  {this.state.selectedBatch ?
                  <span>{this.state.selectedBatch}</span>
                   :
                  <span>Batch No.</span>
                  }
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ marginLeft: "-30px" }}>
                  <Dropdown.Item onClick={(e) => this.setBatch(e.target.id)} id="2020-22">2020-22</Dropdown.Item>
                  <Dropdown.Item onClick={(e) => this.setBatch(e.target.id)} id="2018-20">2018-20</Dropdown.Item>
                  <Dropdown.Item onClick={(e) => this.setBatch(e.target.id)} id="2016-18">2016-18</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </div>
                <FilterStudBysem batch={this.state.selectedBatch} />
              </>
            ) : (
              <>
              <div style={{ height: "400px", marginTop: "100px" }}>
                
                {/* Faculty */}
                <div className="card-deck">
                  <div className="container">
                    <div className="grid" id="grid">
                            
                        {this.state.faculty.map( f => (
                            <div className="card" style={{ height: "100px" }} key={f.id}>
                              <Link
                                to={`/assignSubject/${f.first_name + " " + f.last_name + ":" + f.id}`} 
                                style={{textDecoration:"none",color:"black"}}
                              >
                                <div className="card-body" style={{padding:"10px"}}>
                                <h4 className="card-title" >{f.first_name}&nbsp;{f.last_name}</h4>
                                </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <br></br>
                  </div>
                </div>
                
                {/* <div>
                  <div className="container">
                    <div className="row">
                      {this.state.faculty.map((d) => (
                        <div className="col-sm" key={d.id}>
                          <div className="card" style={{ height: "100px" }}>
                              <Link
                                to={`/assignSubject/${d.username + ":" + d.id}`} 
                                style={{textDecoration:"none",color:"black"}}
                              >
                                <div className="card-body">
                                <h4 className="card-title" >{d.first_name}&nbsp;{d.last_name}</h4>
                            </div>
                              </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div> */}
              </div>
              </>
            )}
          </div>
        )}
      </>
    );
  }
}
export default Admin_Home;
