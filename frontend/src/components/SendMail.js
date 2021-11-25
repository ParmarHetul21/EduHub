import { Component } from "react";
import "../App.css";
import { Redirect } from "react-router";
import {Button, Dropdown} from "react-bootstrap";

export default class SendMail extends Component {
    state={
        selectedBatch: "2020-22"
    }
    setBatch = (e) => {
		this.setState({ selectedBatch: e });
	};
    sendMail = (e) => {
       fetch("http://localhost:8000/auth/sendMail/",{
           method:"POST",
           headers:{
            Authorization: `JWT ${localStorage.getItem("token")}`
           }
       }).then(res => console.log(res))
    }
	render() {
		return (
			<>
				{localStorage.getItem("token") === null ? (
					<Redirect to="/login" />
				) : (
					<div
						className="faculty-home-main"
						style={{
							marginTop: "92px",
							display: "flex",
							flexDirection: "column"
						}}
					>
						<div
							className="Login"
							style={{
								marginTop: "100px",
								marginLeft: "500px",
                                marginRight:"500px"
							}}
						>
                        <h2>welcome</h2>
                        <h4>Select the batch and send passwords to the users through mail</h4>
                        </div>
                        
						<div className="text-center">
                        <Dropdown>
										<Dropdown.Toggle
											variant="success"
											id="dropdown-basic"
											style={{
												backgroundColor: "transparent",
												border: "none",
												color: "black",
												marginRight: "200px",
												
											}}
										>
											{this.state.selectedBatch ? (
												<span>
													{this.state.selectedBatch}
												</span>
											) : (
												<span>Batch No.</span>
											)}
										</Dropdown.Toggle>

										<Dropdown.Menu
											style={{ marginLeft: "-30px" }}
										>
											<Dropdown.Item
												onClick={(e) =>
													this.setBatch(e.target.id)
												}
												id="2020-22"
											>
												2020-22
											</Dropdown.Item>
											<Dropdown.Item
												onClick={(e) =>
													this.setBatch(e.target.id)
												}
												id="2018-20"
											>
												2018-20
											</Dropdown.Item>
											<Dropdown.Item
												onClick={(e) =>
													this.setBatch(e.target.id)
												}
												id="2016-18"
											>
												2016-18
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
                            
                            <Button
								size="lg"
								type="submit"
                                style={{marginLeft:"200px"}}
								onClick={(e) => this.sendMail(e)}
							>
								Send
							</Button>
						</div>

					</div>
				)}
			</>
		);
	}
}
