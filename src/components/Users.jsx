import { useState, useEffect, useContext } from 'react'
import { fetchUsers } from '../api'
import { ListGroup, Image, Row, Col, Button } from 'react-bootstrap'
import '../styling/Users.css'
import { UserContext } from '../contexts/User'


const Users = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const { loggedInUser, setLoggedInUser } = useContext(UserContext)


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
        console.log(user.username, 'logged in')
    }


    if (loading) return <p>Loading users...</p>
    if (error) return <p>Failed to load users</p>


    return (
        <div className='users-container'>
            {loggedInUser.username ? <h2>You are logged in as {loggedInUser.username}</h2> : <h2>Select a user to log in</h2>}
            {loggedInUser.username && <Button variant="danger" onClick={() => setLoggedInUser({})}>Log out</Button>}
            <ListGroup variant="flush" className='user-list-container'>
                {users.map(user => (
                    <ListGroup.Item key={user.username} className='user-list-item'>
                        <Row>
                            <Col xs="4" md="3">
                                <Image src={user.avatar_url} thumbnail className='avatar-user-list' />
                            </Col>
                            <Col xs="5" md="7">
                                <p className="pt-2"><strong>{user.username}</strong></p>
                                <p>({user.name})</p>
                            </Col>
                            <Col xs="3" md="2"><Button onClick={() => handleClick(user)} variant="primary" className="mt-3">Log in</Button></Col>                         
                        </Row>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

export default Users