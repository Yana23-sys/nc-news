import { useState, useEffect } from 'react'
import { fetchComments } from '../api'
import '../styling/CommentsSection.css'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


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
        <div className="mb-4">
            <h2>Comments: {comment_count}</h2>

            {/* <form onSubmit={handleSubmit}>
                <textarea value={newComment} className="form-control" rows="3" onChange={event => setNewComment(event.target.value)}/>
                <button type="submit" className="btn btn-primary">Add Comment</button>
            </form> */}

            <div className='comment-list'>
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {comments.map((comment, idx) => 
                        <Col key={idx}>
                            <Card border="light" className='comment-card' key={comment.comment_id}>
                                <Card.Header>{comment.author}</Card.Header>
                                <Card.Body>
                                    <Card.Text className="card-date mb-2 text-muted">{new Date(comment.created_at).toDateString()}</Card.Text>
                                    <Card.Text>{comment.body}</Card.Text>
                                </Card.Body>
                                <Card.Link href="#">Votes: {comment.votes}</Card.Link>
                            </Card>
                        </Col>
                    )}
                </Row>
            </div>
        </div>
    )
}

export default CommentsSection
