import { Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { fetchTopics } from '../api'
import { UserContext } from '../contexts/User'
import Search from './Search'

const Header = () => {
    const [topics, setTopics] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const { isLoggedIn } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        fetchTopics()
        .then(topics => {
            setTopics(topics)
            setLoading(false)
        })
        .catch(() => {
            setError('Failed to load topics. Please try again')
            setLoading(false)
        })
    }, [])
    
    // if (loading) return <Navbar>Loading topics...</Navbar>
    if (error) return <Navbar>{error}</Navbar>
    
    return (
        <Navbar expand="md" className="bg-body-tertiary mb-3">
            <Container fluid>
                <Navbar.Brand as={Link}  to="/">NC News</Navbar.Brand>

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
                            <Nav.Link as={Link}  to="/articles">Articles</Nav.Link>

                            <NavDropdown title="Topics" id="basic-nav-dropdown">

                                {topics.map((topic) => {
                                    const slugFirstLetterCapital = topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)
                                    return (
                                        <NavDropdown.Item key={topic.slug} as={Link} to={`/topics/${topic.slug}`}>
                                            {slugFirstLetterCapital}
                                        </NavDropdown.Item>
                                )})}
                            </NavDropdown>

                            {/* <Nav.Link as={Link} to="/profile">My profile</Nav.Link> */}
                            <Nav.Link as={Link} to="/users">{isLoggedIn ? 'Log out' : 'Log in'}</Nav.Link>

                        </Nav>

                        <Search onSubmit={q => navigate(`/articles?q=${q}`)}/>
                        
                    </Offcanvas.Body>

                </Navbar.Offcanvas>
            </Container>
        </Navbar>

    )
}

export default Header
