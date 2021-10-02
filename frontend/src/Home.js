import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from 'react-bootstrap';

function Home() {
	return <div style={{ textAlign: "center"}}>
            <Navbar bg="dark" expand="lg">
                <Container>
                        {/* <Navbar.Brand href="#home">
                        <img
                            src="/src/download.png"
                            width="100"
                            height="100"
                            alt="EduHub"
                        />
                        </Navbar.Brand> */}

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
           </div>;
}

export default Home;
