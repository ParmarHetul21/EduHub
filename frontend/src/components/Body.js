import { Component } from "react";
import semester from "./icons/semester.png";
import "../App.css";

class Body extends Component {
	render() {
		return (
			<div>
				{/* Background Image */}
				<div id="hb_image"></div>

				{/* Semester */}
				<div className="card-deck">
					<div className="container">
						<div className="row">
							<div className="col-sm">
								<div className="card">
									<img
										className="card-img-top"
										src={semester}
										alt="Card image cap"
									/>
									<div className="card-body">
										<h5 className="card-title">
											Semester - 1
										</h5>
									</div>
								</div>
							</div>
							<div className="col-sm">
								<div className="card">
									<img
										className="card-img-top"
										src={semester}
										alt="Card image cap"
									/>
									<div className="card-body">
										<h5 className="card-title">
											Semester - 2
										</h5>
									</div>
								</div>
							</div>
							<div className="col-sm">
								<div className="card">
									<img
										className="card-img-top"
										src={semester}
										alt="Card image cap"
									/>
									<div className="card-body">
										<h5 className="card-title">
											Semester - 3
										</h5>
									</div>
								</div>
							</div>
							<div className="col-sm">
								<div className="card">
									<img
										className="card-img-top"
										src={semester}
										alt="Card image cap"
									/>
									<div className="card-body">
										<h5 className="card-title">
											Semester - 4
										</h5>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Faculty */}
				<div
					id="carouselExampleControls"
					class="carousel slide"
					data-ride="carousel"
				>
					<div class="carousel-inner">
						<div class="carousel-item active">
							<div class="cards-wrapper">
								<div class="card-faculty">
									<img
										src="..."
										class="card-img-top"
										alt="..."
									/>
									<div class="card-body">
										<h5 class="card-title">Card title</h5>
										<p class="card-text">
											Some quick example text to build on
											the card title and make up the bulk
											of the card's content.
										</p>
										<a href="#" class="btn btn-primary">
											Go somewhere
										</a>
									</div>
								</div>
								<div class="card d-none d-md-block">
									<img
										src="..."
										class="card-img-top"
										alt="..."
									/>
									<div class="card-body">
										<h5 class="card-title">Card title</h5>
										<p class="card-text">
											Some quick example text to build on
											the card title and make up the bulk
											of the card's content.
										</p>
										<a href="#" class="btn btn-primary">
											Go somewhere
										</a>
									</div>
								</div>
								<div class="card d-none d-md-block">
									<img
										src="..."
										class="card-img-top"
										alt="..."
									/>
									<div class="card-body">
										<h5 class="card-title">Card title</h5>
										<p class="card-text">
											Some quick example text to build on
											the card title and make up the bulk
											of the card's content.
										</p>
										<a href="#" class="btn btn-primary">
											Go somewhere
										</a>
									</div>
								</div>
							</div>
						</div>
						<div class="carousel-item">
							<div class="cards-wrapper">
								<div class="card-faculty">
									<img
										src="..."
										class="card-img-top"
										alt="..."
									/>
									<div class="card-body">
										<h5 class="card-title">Card title</h5>
										<p class="card-text">
											Some quick example text to build on
											the card title and make up the bulk
											of the card's content.
										</p>
										<a href="#" class="btn btn-primary">
											Go somewhere
										</a>
									</div>
								</div>
								<div class="card d-none d-md-block">
									<img
										src="..."
										class="card-img-top"
										alt="..."
									/>
									<div class="card-body">
										<h5 class="card-title">Card title</h5>
										<p class="card-text">
											Some quick example text to build on
											the card title and make up the bulk
											of the card's content.
										</p>
										<a href="#" class="btn btn-primary">
											Go somewhere
										</a>
									</div>
								</div>
								<div class="card d-none d-md-block">
									<img
										src="..."
										class="card-img-top"
										alt="..."
									/>
									<div class="card-body">
										<h5 class="card-title">Card title</h5>
										<p class="card-text">
											Some quick example text to build on
											the card title and make up the bulk
											of the card's content.
										</p>
										<a href="#" class="btn btn-primary">
											Go somewhere
										</a>
									</div>
								</div>
							</div>
						</div>
						<div class="carousel-item">
							<div class="cards-wrapper">
								<div class="card-faculty">
									<img
										src="..."
										class="card-img-top"
										alt="..."
									/>
									<div class="card-body">
										<h5 class="card-title">Card title</h5>
										<p class="card-text">
											Some quick example text to build on
											the card title and make up the bulk
											of the card's content.
										</p>
										<a href="#" class="btn btn-primary">
											Go somewhere
										</a>
									</div>
								</div>
								<div class="card d-none d-md-block">
									<img
										src="..."
										class="card-img-top"
										alt="..."
									/>
									<div class="card-body">
										<h5 class="card-title">Card title</h5>
										<p class="card-text">
											Some quick example text to build on
											the card title and make up the bulk
											of the card's content.
										</p>
										<a href="#" class="btn btn-primary">
											Go somewhere
										</a>
									</div>
								</div>
								<div class="card d-none d-md-block">
									<img
										src="..."
										class="card-img-top"
										alt="..."
									/>
									<div class="card-body">
										<h5 class="card-title">Card title</h5>
										<p class="card-text">
											Some quick example text to build on
											the card title and make up the bulk
											of the card's content.
										</p>
										<a href="#" class="btn btn-primary">
											Go somewhere
										</a>
									</div>
								</div>
							</div>
						</div>
						<div class="carousel-item">
							<div class="cards-wrapper">
								<div class="card-faculty">
									<img
										src="..."
										class="card-img-top"
										alt="..."
									/>
									<div class="card-body">
										<h5 class="card-title">Card title</h5>
										<p class="card-text">
											Some quick example text to build on
											the card title and make up the bulk
											of the card's content.
										</p>
										<a href="#" class="btn btn-primary">
											Go somewhere
										</a>
									</div>
								</div>
								<div class="card d-none d-md-block">
									<img
										src="..."
										class="card-img-top"
										alt="..."
									/>
									<div class="card-body">
										<h5 class="card-title">Card title</h5>
										<p class="card-text">
											Some quick example text to build on
											the card title and make up the bulk
											of the card's content.
										</p>
										<a href="#" class="btn btn-primary">
											Go somewhere
										</a>
									</div>
								</div>
								<div class="card d-none d-md-block">
									<img
										src="..."
										class="card-img-top"
										alt="..."
									/>
									<div class="card-body">
										<h5 class="card-title">Card title</h5>
										<p class="card-text">
											Some quick example text to build on
											the card title and make up the bulk
											of the card's content.
										</p>
										<a href="#" class="btn btn-primary">
											Go somewhere
										</a>
									</div>
								</div>
							</div>
						</div>
						<div class="carousel-item">
							<div class="cards-wrapper">
								<div class="card-faculty">
									<img
										src="..."
										class="card-img-top"
										alt="..."
									/>
									<div class="card-body">
										<h5 class="card-title">Card title</h5>
										<p class="card-text">
											Some quick example text to build on
											the card title and make up the bulk
											of the card's content.
										</p>
										<a href="#" class="btn btn-primary">
											Go somewhere
										</a>
									</div>
								</div>
								<div class="card d-none d-md-block">
									<img
										src="..."
										class="card-img-top"
										alt="..."
									/>
									<div class="card-body">
										<h5 class="card-title">Card title</h5>
										<p class="card-text">
											Some quick example text to build on
											the card title and make up the bulk
											of the card's content.
										</p>
										<a href="#" class="btn btn-primary">
											Go somewhere
										</a>
									</div>
								</div>
								<div class="card d-none d-md-block">
									<img
										src="..."
										class="card-img-top"
										alt="..."
									/>
									<div class="card-body">
										<h5 class="card-title">Card title</h5>
										<p class="card-text">
											Some quick example text to build on
											the card title and make up the bulk
											of the card's content.
										</p>
										<a href="#" class="btn btn-primary">
											Go somewhere
										</a>
									</div>
								</div>
							</div>
						</div>
						<div class="carousel-item">
							<div class="cards-wrapper">
								<div class="card-faculty">
									<img
										src="..."
										class="card-img-top"
										alt="..."
									/>
									<div class="card-body">
										<h5 class="card-title">Card title</h5>
										<p class="card-text">
											Some quick example text to build on
											the card title and make up the bulk
											of the card's content.
										</p>
										<a href="#" class="btn btn-primary">
											Go somewhere
										</a>
									</div>
								</div>
								<div class="card d-none d-md-block">
									<img
										src="..."
										class="card-img-top"
										alt="..."
									/>
									<div class="card-body">
										<h5 class="card-title">Card title</h5>
										<p class="card-text">
											Some quick example text to build on
											the card title and make up the bulk
											of the card's content.
										</p>
										<a href="#" class="btn btn-primary">
											Go somewhere
										</a>
									</div>
								</div>
								<div class="card d-none d-md-block">
									<img
										src="..."
										class="card-img-top"
										alt="..."
									/>
									<div class="card-body">
										<h5 class="card-title">Card title</h5>
										<p class="card-text">
											Some quick example text to build on
											the card title and make up the bulk
											of the card's content.
										</p>
										<a href="#" class="btn btn-primary">
											Go somewhere
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<a
						class="carousel-control-prev"
						href="#carouselExampleControls"
						role="button"
						data-slide="prev"
					>
						<span
							class="carousel-control-prev-icon"
							aria-hidden="true"
						></span>
						<span class="sr-only">Previous</span>
					</a>
					<a
						class="carousel-control-next"
						href="#carouselExampleControls"
						role="button"
						data-slide="next"
					>
						<span
							class="carousel-control-next-icon"
							aria-hidden="true"
						></span>
						<span class="sr-only">Next</span>
					</a>
				</div>
			</div>
		);
	}
}

export default Body;
