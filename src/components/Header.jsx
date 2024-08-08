import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';

// import { useContext } from 'react'
// import { UserContext } from '../contexts/User'

const Header = () => {
    // const { loggedInUser, isLoggedIn } = useContext(UserContext)
    // console.log(loggedInUser, isLoggedIn)
    
    return (
        <Navbar expand="md" className="bg-body-tertiary mb-3">
            <Container fluid>
                <Navbar.Brand href="#home">NC News</Navbar.Brand>
                {/* <p>Hello {isLoggedIn ? loggedInUser.username : 'guest'}</p> */}

                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />

                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-md`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                    placement="end"
                >
                        
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                            NC News
                        </Offcanvas.Title>
                    </Offcanvas.Header>

                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/articles">Articles</Nav.Link>

                            <NavDropdown title="Topics" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Topic 1</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Topic 2</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Topic 3</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link href="/profile">My profile</Nav.Link>
                            <Nav.Link href="/users">Users</Nav.Link>

                        </Nav>

                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Offcanvas.Body>

                </Navbar.Offcanvas>
            </Container>
        </Navbar>

    )
}

export default Header
