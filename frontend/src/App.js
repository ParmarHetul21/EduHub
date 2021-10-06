import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Login from "./components/Login";
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/">
            <Header/>
            <Body/>
            <Footer/>
            </Route>

            <Route path="/login">
            <Header/>
            <Login/>
            <Footer/>
            </Route>

          </Switch>
          
        </Router>


      </div>
    );
  }
}
export default App;
