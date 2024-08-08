import { useState, useEffect, useContext } from 'react'
import { fetchUsers } from '../api'
import { ListGroup, Image, Row, Col, Button } from 'react-bootstrap'
import '../styling/Users.css'
import { UserContext } from '../contexts/User'


const Users = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    // const [loginPrompt, setLoginPrompt] = useState("")
    const { setLoggedInUser } = useContext(UserContext)


    useEffect(() => {
        setLoading(true)
        fetchUsers()
        .then(users => {
            setUsers(users)
            setLoading(false)
        })
        .catch(err => {
            setError(true)
            setLoading(false)
        })
    }, [])

    const handleClick = (user) => {
        setLoggedInUser(user)
        // setLoginPrompt("")
        console.log(user.username, 'logged in')
    }


    if (loading) return <p>Loading users...</p>
    if (error) return <p>Failed to load users</p>


    return (
        <div className='users-container'>
            <h1>Users</h1>
            <ListGroup variant="flush" className='user-list-container'>
                <ListGroup.Item className='user-list-header'>
                    <Row>
                        <Col><h3>Avatar</h3></Col>
                        <Col><h3>Username</h3></Col>
                        <Col><h3>Name</h3></Col>
                    </Row>
                </ListGroup.Item>
                {users.map(user => (
                    <ListGroup.Item key={user.username} className='user-list-item'>
                        <Row>
                            <Col >
                                <Image src={user.avatar_url} thumbnail className='avatar-user-list' />
                            </Col>
                            <Col md lg="6"><p>{user.username}</p></Col>
                            <Col ><p>{user.name}</p></Col>
                            <Col><Button onClick={() => handleClick(user)} variant="primary">Log in</Button></Col>
                            
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

export default Users