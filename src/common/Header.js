import React from 'react'
import { Link } from 'react-router-dom'
import { 
	Container,
	Row,
	Col,
	Navbar,
	Nav,
	NavDropdown
} from 'react-bootstrap';

class Header extends React.Component {
	render() {
		return(
			<header>
				<Container>
					<Row className="pt-3">
						<Col>
							<Link to="/"><h1>SHOPPERNOW</h1></Link>
						</Col>

						<Col>
							<Navbar bg="light" expand="lg">
							  <Navbar.Toggle aria-controls="basic-navbar-nav" />
							  <Navbar.Collapse id="basic-navbar-nav">
							    <Nav className="ml-auto">
							      <Nav.Link as={Link} to="/">Home</Nav.Link>
							      <Nav.Link as={Link} to="/cart">My Cart</Nav.Link>
							      <NavDropdown title="Account" id="basic-nav-dropdown">
							        <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
							        <NavDropdown.Item as={Link} to="/setting">Setting</NavDropdown.Item>
							        <NavDropdown.Divider />
							        <NavDropdown.Item href="/signout">Signout</NavDropdown.Item>
							      </NavDropdown>
										<Nav.Link as={Link} to="/signin">Signin</Nav.Link>
										<Nav.Link as={Link} to="/signup">Signup</Nav.Link>
							    </Nav>
							  </Navbar.Collapse>
							</Navbar>
						</Col>
					</Row>
				</Container>
			</header>
		)
	}
}

export default Header