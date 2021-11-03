import { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
class Password extends Component {
  state = {
    userData: [],
    passwordStatus: "",
  };

  componentDidMount() {
    fetch(
      `http://localhost:8000/auth/currentStudent/${localStorage.getItem(
        "username"
      )}/`,
      {
        method: "GET",
        headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
      }
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState(
          { userData: data, passwordStatus: data[0].passwordStatus },
          () => {
            console.log(this.state.passwordStatus);
          }
        )
      );
  }
  render() {
    // if (this.state.userData != []) {
    //   if (this.state.userData[0].passwordStatus) {
    //     return <Redirect to="/" />;
    //   }
    // }
    return (
      <>
        {this.state.passwordStatus ? (
          <Redirect to="/" />
        ) : (
          <div className="text" style={{ height: "580px" }}>
            <div className="bg_color">
              <h4> You must change your password to proceed.</h4>
            </div>
            <Form>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  Useranme
                </Form.Label>
                <Col sm="10">
                  <Form.Control plaintext readOnly defaultValue="Test User" />
                </Col>
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  Current Password
                </Form.Label>
                <Form.Control
                  size="lg"
                  type="password"
                  style={{
                    background: "#1c2b4b",
                    marginBottom: "15px",
                    color: "white",
                    width: "300px",
                  }}
                />
              </Form.Group>

              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  New Password
                </Form.Label>
                <Form.Control
                  size="lg"
                  type="password"
                  style={{
                    background: "#1c2b4b",
                    marginBottom: "15px",
                    color: "white",
                    width: "300px",
                  }}
                />
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="2">
                  Re-enter Password
                </Form.Label>
                <Form.Control
                  size="lg"
                  type="password"
                  style={{
                    background: "#1c2b4b",
                    marginBottom: "15px",
                    color: "white",
                    width: "300px",
                  }}
                />
              </Form.Group>

              <Link to="/login">
                <input
                  className="btn btn-link"
                  type="submit"
                  value="Save Changes"
                  style={{
                    marginLeft: "100px",
                    textDecoration: "None",
                    color: "black",
                    fontSize: "25px",
                  }}
                />
              </Link>
            </Form>
          </div>
        )}
      </>
    );
  }
}

export default Password;
