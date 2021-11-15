import { Component } from "react";
import "../App.css";
import { Redirect } from "react-router";
import EduHub from "../components/icons/ve-removebg-preview.png";
import { Form } from "react-bootstrap";

class Login extends Component {
  state = {
    username: "",
    logged_in: false,
    is_superuser: false,
    is_staff: false,
    passwordStatus: null
  };
  handle_change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };
  handle_login = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.token) {
          localStorage.setItem("token", json.token);
          localStorage.setItem("id", json.user.id);
          localStorage.setItem("username", json.user.username);
          if (json.user.is_staff === true) {
            localStorage.setItem("whichUser", "faculty");
          } else {
            localStorage.setItem("whichUser", "student");
          }
          this.setState({
            logged_in: true,
            username: json.user.username,
            is_superuser: json.user.is_superuser,
            is_staff: json.user.is_staff,
          });
        } else {
          alert("wrong credentials");
        }
      })
      setTimeout(() => {
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
            this.setState({ passwordStatus: data[0].passwordStatus },()=>{
              console.log("this is status of password", this.state.passwordStatus)
            })
          );  
      }, 700);
      
  };

  async componentDidMount() {
    if (localStorage.getItem("token")) {
      await fetch("http://localhost:8000/auth/current_user/", {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          this.setState({ username: json.username, logged_in: true }, () =>
            localStorage.setItem("id", json.id)
          );
        });
    }
  }
  render() {
    if (this.state.logged_in) {
      if (this.state.is_superuser) {
        return <Redirect to="/admin_home" />;
      } else if (this.state.is_staff && !this.state.is_superuser) {
        return <Redirect to="/faculty_home" />;
      } 
      else if(this.state.passwordStatus == true) {
        return <Redirect to="/" />;
      }
      else if(this.state.passwordStatus == false){
        return <Redirect to="/setPassword" />;
      }      
    }
    return (
      <>
        
        <div className="container-login">
          <div className="image">
            <img
              src={EduHub}
              width="500"
              height="auto"
              alt="Login"
              style={{ marginTop: "6px", padding: "30px" }}
            />
          </div>
          <div className="text">
            <Form>
              <input
                size="lg"
                type="text"
                placeholder="Username"
                name="username"
                style={{
                  background: "#1c2b4b",
                  marginBottom: "15px",
                  color: "white",
                  width: "300px",
                }}
                onChange={this.handle_change}
              />
              <br />
              <input
                size="lg"
                type="password"
                placeholder="Password"
                name="password"
                style={{
                  background: "#1c2b4b",
                  marginBottom: "15px",
                  color: "white",
                  width: "300px",
                }}
                onChange={this.handle_change}
              />
              <br />
              <input
                className="btn btn-link"
                type="submit"
                value="Login"
                onClick={(e) => this.handle_login(e, this.state)}
                style={{
                  marginLeft: "100px",
                  textDecoration: "None",
                  color: "black",
                  fontSize: "25px",
                }}
              />
            </Form>
          </div>
        </div>
      </>
    );
  }
}
export default Login;
