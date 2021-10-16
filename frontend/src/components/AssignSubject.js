import { Component } from "react";
import { Row,Col,FloatingLabel,Form,Button } from "react-bootstrap";
import "../App.css";

class AssignSubject extends Component{
    render(){
        return<>

        <div className="text" style={{ height: "580px" }}>
				<div className="bg_color_admin">
					<h4>Mr Steve</h4>
				</div>
                <div className="container">
                    <Row className="d-flex justify-content-center">    
                        <Col sm>
                            <FloatingLabel controlId="floatingSelectGrid" label="Select Semester">
                            <Form.Select aria-label="Floating label select example">                            
                                <option value="1">semester-1</option>
                                <option value="2">semester-2</option>
                                <option value="3">semester-3</option>
                                <option value="3">semester-4</option>
                            </Form.Select>
                            </FloatingLabel>
                        </Col>

                        <Col sm style = {{marginLeft:"50px"}}>
                            <FloatingLabel controlId="floatingSelectGrid" label="Select Subject">
                            <Form.Select aria-label="Floating label select example">        
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                            </FloatingLabel>
                        </Col>

                        <Col sm>
                        <Button size="lg" type="submit" style = {{marginLeft:"50px",
                                                                marginTop:"5px"}}>
								Add
							</Button>
                        </Col>
                    </Row>
                        </div>
                    <br></br>
                    
                    <div className="faculty-subjectCard" >
                        <div style={{flex:1, marginLeft:"20px"}}>
                            Data Science 
                        </div>

                        <div style={{flex:1}}>
                            Semester-1
                        </div>

                        <div style={{flex:0,marginRight:"40px"}}>
                            Update
                        </div>

                        <div style={{flex:0,marginRight:"20px"}}>
                            Delete
                        </div>
                    </div>
        </div>
        </>
        
    }

}
export default AssignSubject;