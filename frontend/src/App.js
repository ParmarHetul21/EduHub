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
import FilterStudent from "./components/FilterStudent";
import FacultyHome from "./components/FacultyHome";
import FacultyUploadFile from "./components/FacultyUploadFile";
import FacultyHeader from "./components/FacultyHeader";
import StudentPanel from "./components/StudentPanel";
import StudentFileUpload from "./components/StudentFileUpload";
import FileApproval from "./components/FileApproval";
import ReviewFiles from "./components/ReviewFiles";
import SendMail from "./components/SendMail";

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

						<Route exact path="/studentPanel/:sem">
							<Header />
							<StudentPanel />
							<Footer />
						</Route>

						<Route path="/login">
							<Header />
							<Login />
							<Footer />
						</Route>

						<Route path="/setPassword">
							<Header />
							<Password />
							<Footer />
						</Route>

						{/* Admin  */}
						<Route path="/admin_home">
							<AdminHeader />
							<AdminHome />
							<Footer />
						</Route>

						{/* send mail */}
						<Route path="/sendMail">
							<AdminHeader/>
							<SendMail/>
							<Footer/>
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

						<Route path="/assignSubject/:username">
							<AdminHeader />
							<AssignSubject />
							<Footer />
						</Route>

						<Route path="/filterStudent/:semester">
							<AdminHeader />
							<FilterStudent />
							<Footer />
						</Route>

						{/* Faculty */}

						<Route path="/faculty_home">
							<FacultyHeader />
							<FacultyHome />
							<Footer />
						</Route>

						<Route path="/fileApproval">
							<FacultyHeader />
							<FileApproval />
							<Footer />
						</Route>

						<Route path="/faculty_file_upload">
							<FacultyHeader />
							<FacultyUploadFile />
							<Footer />
						</Route>
					</Switch>

					{/* student */}
					<Route path="/studentFileUpload">
						<Header />
						<StudentFileUpload />
						<Footer />
					</Route>

					<Route path="/reviewfiles">
						<Header />
						<ReviewFiles />
						<Footer />
					</Route>
				</Router>
			</div>
		);
	}
}
export default App;
