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

        <div className="card-deck">
            <div className="container">
                <div className="row">
                    {this.state.semesters.map(s => (
                        <div className="col-sm" key={s}>
                            <Link to = {`/filterStudent/${s}:${this.props.batch}`} style={{textDecoration:"none",color:"black"}}>
                        <div className="card" style={{marginLeft:"20px"}}>
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
                    
           
                </div>
            </div>
        </div>
    </div>
    </>
    }
}

export default FilterStudBysem;