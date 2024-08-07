import { useState, useEffect } from 'react'
import { fetchComments } from '../api'
import '../styling/CommentsSection.css'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'


const CommentsSection = ({ article_id, comment_count }) => {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    // const [newComment, setNewComment] = useState('')

    useEffect(() => {
        setLoading(true)
        fetchComments(article_id).then(fetchedComments => {
            setComments(fetchedComments)
            setLoading(false)
        })
        .catch(err => {
            setError(true)
            setLoading(false)
        })
    }, [article_id])

    
    if (loading) return <p>Loading article...</p>
    if (error) return <p>Failed to fetch article</p>

    // const handleSubmit = (event) => {
    //     event.preventDefault()
    // }

    return (
        <Container className='comment-list'>
            <h3>Comments: {comment_count}</h3>
            <Row xs={1} sm={2} md={2} lg={4} className="g-4">
                {comments.map((comment, idx) => 
                    <Col key={idx}>
                        <Card border="light" className='one-comment-card' key={comment.comment_id}>
                            <Card.Header>{comment.author}</Card.Header>
                            <Card.Text className="card-date text-muted">{new Date(comment.created_at).toDateString()}</Card.Text>
                            <Card.Body className='d-flex justify-content-start'>
                                <Card.Text className="card-text-body">{comment.body}</Card.Text>
                            </Card.Body>
                            <Card.Link className="mb-3" href="#">Votes: {comment.votes}</Card.Link>
                        </Card>
                    </Col>
                )}
            </Row>
        </Container>
    )
}

export default CommentsSection


            {/* <form onSubmit={handleSubmit}>
                <textarea value={newComment} className="form-control" rows="3" onChange={event => setNewComment(event.target.value)}/>
                <button type="submit" className="btn btn-primary">Add Comment</button>
            </form> */}