import React from 'react'
import { Link } from 'react-router-dom'
import { 
	Container,
	Row,
	Col,
	Navbar,
	Nav,
	NavDropdown,
	Image
} from 'react-bootstrap'
import { connect } from "react-redux"

const mapStateToProps = state => {
	return { token: state.token }
}

class HeaderComp extends React.Component {

	state = {
		isGuest: true,
	}

	componentDidMount() {
		const isGuest = this.props.token === ''
		this.setState({ isGuest })
	}

	// update when reveived authenticated
	componentWillReceiveProps(nextProps) {
		if (typeof nextProps.token !== 'undefined') {
			const isGuest = nextProps.token === ''
			this.setState({ isGuest })
		}
	}

	render() {
		return(
			<header>
				<Container>
					<Row className="pt-3">
						<Col>
							<Link to="/">
								<Image src="/images/tshirtshop.png" fluid />
							</Link>
						</Col>

						<Col>
							<Navbar bg="light" expand="lg">
							  <Navbar.Toggle aria-controls="basic-navbar-nav" />
							  <Navbar.Collapse id="basic-navbar-nav">
							    <Nav className="ml-auto">
							      <Nav.Link as={Link} to="/">Home</Nav.Link>
							      { !this.state.isGuest && <Nav.Link as={Link} to="/cart">My Cart</Nav.Link> }
							      { !this.state.isGuest && <NavDropdown title="Account" id="basic-nav-dropdown">
							        <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
							        <NavDropdown.Item as={Link} to="/setting">Setting</NavDropdown.Item>
							        <NavDropdown.Divider />
							        <NavDropdown.Item as={Link} to="/signout">Signout</NavDropdown.Item>
							      </NavDropdown> }
										{ this.state.isGuest && <Nav.Link as={Link} to="/signin">Signin</Nav.Link> }
										{ this.state.isGuest && <Nav.Link as={Link} to="/signup">Signup</Nav.Link> }
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

const Header = connect(mapStateToProps) (HeaderComp)

export default Header