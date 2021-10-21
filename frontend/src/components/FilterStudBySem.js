import { Component } from "react";
import { Link } from "react-router-dom";
import semester from "../components/icons/semester.png";

class FilterStudBysem extends Component {
    state = {
        semesters:[1,2,3,4],
    }
    render(){
        return <>
        <div
        style={{
            height: "400px",
            marginTop: "280px",
        }}
    >
        {/* Student */}
        <div className="card-deck" onClick="">
            <div className="container">
                <div className="row">
                    {this.state.semesters.map(s => (
                        <div className="col-sm">
                            <Link to = {`/filterStudent/${s}`} style={{textDecoration:"none",color:"black"}}>
                        <div className="card">
                            <img
                                className="card-img-top"
                                src={semester}
                                alt="Card cap"
                            />
                            <div className="card-body">
                                <h5 className="card-title">
                                    {`Semester - ${s}`}
                                </h5>
                            </div>
                        </div>
                    </Link>
                    </div>
                    ))}
                    
                    {/* <div className="col-sm">
                        <div className="card">
                            <img
                                className="card-img-top"
                                src={semester}
                                alt="Card cap"
                            />
                            <div className="card-body">
                                <h5 className="card-title">
                                    Semester - 2
                                </h5>
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
                                <h5 className="card-title">
                                    Semester - 3
                                </h5>
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
                                <h5 className="card-title">
                                    Semester - 4
                                </h5>
                            </div>
                        </div> */}
                    {/* </div> */}
                </div>
            </div>
        </div>
    </div>
    </>
    }
}

export default FilterStudBysem;