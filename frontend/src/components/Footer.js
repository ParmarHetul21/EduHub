import { Component } from "react";
import "../App.css";
class Footer extends Component {
	render() {
		return (
			// <footer className="footer mt-auto py-3 fixed-bottom">
			// 	<div className="container d-inline-flex justify-content-between content-wrapperfootr">
			// 		<span className="text-light h5">
			// 			{" "}
			// 			&copy; EduHub - 2021 All rights reserved
			// 		</span>
			// 		<span className="text-light h5"> Contact Us</span>
			// 	</div>
			// </footer>
			<footer
				id="sticky-footer"
				className="flex-shrink-20 py-2 text-white-200 d-flex justify-content-around"
			>
				<span className="text-light h4">
					&copy; EduHub - 2021 All rights reserved
				</span>
				<span className="text-light h4"> Contact Us</span>
			</footer>
		);
	}
}

export default Footer;
