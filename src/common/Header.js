import React from 'react'
import { Link } from 'react-router-dom'
import { 
	Container,
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
				<Navbar bg="dark" variant="dark" expand="lg">
					<Container>
					
						<Navbar.Brand as={Link} to="/"><Image src="/images/tshirtshop.png" fluid /></Navbar.Brand>
					
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="ml-auto">
								<Nav.Link as={Link} to="/">HOME</Nav.Link>
								{ !this.state.isGuest && <Nav.Link as={Link} to="/cart">MY CART</Nav.Link> }
								{ !this.state.isGuest && <Nav.Link as={Link} to="/orders">ORDER</Nav.Link> }
								{ !this.state.isGuest && <NavDropdown title="ACCOUNT" id="basic-nav-dropdown">
									<NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
									<NavDropdown.Item as={Link} to="/setting">Setting</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item as={Link} to="/signout">Signout</NavDropdown.Item>
								</NavDropdown> }
								{ this.state.isGuest && <Nav.Link as={Link} to="/signin">SIGN IN</Nav.Link> }
								{ this.state.isGuest && <Nav.Link as={Link} to="/signup">SIGN UP</Nav.Link> }
							</Nav>
						</Navbar.Collapse>
					
					</Container>
				</Navbar>
			</header>
		)
	}
}

const Header = connect(mapStateToProps) (HeaderComp)

export default Header