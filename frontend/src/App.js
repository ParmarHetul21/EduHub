import "bootstrap/dist/css/bootstrap.min.css";
import { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
		<Body/>
		<Footer/>
      </div>
	  
    );
  }
}
export default App;