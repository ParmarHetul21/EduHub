import { Component } from "react";
import semester from "../components/icons/semester.png";

class FilterStudBysem extends Component {
    render(){
        return <>
        <div
        style={{
            height: "400px",
            marginTop: "280px",
        }}
    >
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
                                <h5 className="card-title">
                                    Semester - 1
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
    }
}

export default FilterStudBysem;