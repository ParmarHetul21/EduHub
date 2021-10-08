import { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import semester from "../components/icons/semester.png";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

class Admin_Home extends Component {
  state = {
    isAdmin: false,
  };
  render() {
    return (
      <div>
        <div
          className=" d-flex justify-content-between"
          style={{
            marginTop: "100px",
            marginLeft: "20px",
          }}
        >
          <ToggleButtonGroup
            type="checkbox"
            //   value={value}
            //   onChange={handleChange}
            style={{
              justifyContent: "flex-start",
            }}
          >
            <ToggleButton id="tbg-btn-1" value={1}>
              Students
            </ToggleButton>
            <ToggleButton id="tbg-btn-2" value={2}>
              Faculties
            </ToggleButton>
          </ToggleButtonGroup>
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "black",
                marginRight: "30px",
              }}
            >
              <span>Batch No.</span>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ marginLeft: "-30px" }}>
              <Dropdown.Item>2020-22</Dropdown.Item>
              <Dropdown.Item>2018-20</Dropdown.Item>
              <Dropdown.Item>2016-18</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {this.state.isAdmin ? (
          <>
            <div style={{ height: "400px", marginTop: "280px" }}>
              {/* Student */}
              <div className="card-deck">
                <div className="container">
                  <div className="row">
                    <div className="col-sm">
                      <div className="card">
                        <img
                          className="card-img-top"
                          src={semester}
                          alt="Card cap"
                        />
                        <div className="card-body">
                          <h5 className="card-title">Semester - 1</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="card">
                        <img
                          className="card-img-top"
                          src={semester}
                          alt="Card cap"
                        />
                        <div className="card-body">
                          <h5 className="card-title">Semester - 2</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="card">
                        <img
                          className="card-img-top"
                          src={semester}
                          alt="Card cap"
                        />
                        <div className="card-body">
                          <h5 className="card-title">Semester - 3</h5>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="card">
                        <img
                          className="card-img-top"
                          src={semester}
                          alt="Card cap"
                        />
                        <div className="card-body">
                          <h5 className="card-title">Semester - 4</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div style={{ height: "400px", marginTop: "165px" }}>
            {/* Faculty */}
            <div className="card-deck">
              <div className="container">
                <div className="row">
                  <div className="col-sm">
                    <div className="card" style={{ height: "100px" }}>
                      <div className="card-body">
                        <h5 className="card-title">Mr.Steve</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="card" style={{ height: "100px" }}>
                      <div className="card-body">
                        <h5 className="card-title">Mrs.Natasha</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="card" style={{ height: "100px" }}>
                      <div className="card-body">
                        <h5 className="card-title">Mr.Tony</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="card" style={{ height: "100px" }}>
                      <div className="card-body">
                        <h5 className="card-title">Mrs.Wanda</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row" style={{ marginTop: "40px" }}>
                  <div className="col-sm">
                    <div className="card" style={{ height: "100px" }}>
                      <div className="card-body">
                        <h5 className="card-title">Mr.rommm</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="card" style={{ height: "100px" }}>
                      <div className="card-body">
                        <h5 className="card-title">Mr.sejojo</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="card" style={{ height: "100px" }}>
                      <div className="card-body">
                        <h5 className="card-title">Mrs.Demo</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="card" style={{ height: "100px" }}>
                      <div className="card-body">
                        <h5 className="card-title">Mr.Data</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Admin_Home;
