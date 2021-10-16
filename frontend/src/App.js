import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import AdminHome from "./components/Admin_Home";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Password from "./components/Password";
import AdminHeader from "./components/Admin_header";
import Addsubjects from "./components/Addsubjects";
import Addusers from "./components/Addusers";
import AssignSubject from "./components/AssignSubject";

class App extends Component {
	render() {
		return (
			<div>
				<Router>
					<Switch>
						<Route exact path="/">
							<Header />
							<Body />
							<Footer />
						</Route>

						<Route path="/login">
							<Header />
							<Login />
							<Footer />
						</Route>

						<Route path="/password">
							<Header />
							<Password />
							<Footer />
						</Route>

						<Route path="/admin_home">
							<AdminHeader />
							<AdminHome />
							<Footer />
						</Route>

						<Route path="/addsubjects">
							<AdminHeader />
							<Addsubjects />
							<Footer />
						</Route>

						<Route path="/addusers">
							<AdminHeader />
							<Addusers />
							<Footer />
						</Route>

						<Route path="/assignSubject">
							<AdminHeader />
							<AssignSubject />
							<Footer />
						</Route>

					</Switch>
				</Router>
			</div>
		);
	}
}
export default App;
