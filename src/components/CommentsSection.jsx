import { useState, useEffect, useContext } from 'react'
import { fetchComments, deleteComment } from '../api'
import '../styling/CommentsSection.css'
import { Card, Col, Row, Container, Button } from 'react-bootstrap'
import { UserContext } from '../contexts/User'




const CommentsSection = ({ article_id, setUpdatedComments, updatedComments }) => {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const { loggedInUser } = useContext(UserContext)
    const [isDeleting, setIsDeleting] = useState(false)
    const [commentIdToDelete, setCommentIdToDelete] = useState(null)


    useEffect(() => {
        setLoading(true)
        fetchComments(article_id)
        .then(fetchedComments => {
            setComments(fetchedComments)
            setLoading(false)
        })
        .catch(() => {
            setError('Failed to download comments')
            setLoading(false)
        })
    }, [article_id, updatedComments])

    console.log(comments, 'comments in state section')

    
    

    const handleDeleteComment = (comment_id) => {
        setIsDeleting(true)
        setCommentIdToDelete(comment_id)

        deleteComment(comment_id)
        .then(() => {
            setComments(comments.filter(comment => comment.comment_id !== comment_id))
            setUpdatedComments(prevValue => !prevValue)
            setIsDeleting(false)
        })
        .catch(() => {
            setError('Could not delete comment. Please try again')
            setIsDeleting(false)
        })
    }


    if (loading) return <p>Loading comments...</p>

    

    return (
        <Container className='comment-list'>
            <h3>Comments: {comments.length}</h3>

            {error && <Alert variant="danger" className="mt-2">{error}</Alert>}

            <Row xs={1} sm={1} md={2} lg={4} className="g-4">
                {comments.map((comment, idx) => 
                    <Col key={idx}>
                        <Card border="light" className='one-comment-card' key={comment.comment_id}>
                            <Card.Header>{comment.author}</Card.Header>

                            <Card.Text className="card-date text-muted">{new Date(comment.created_at).toDateString()}</Card.Text>
                            <Card.Body className='d-flex justify-content-start'>
                                <Card.Text className="card-text-body">{comment.body}</Card.Text>
                            </Card.Body>
                            <Card.Link className="mb-3" href="#">Votes: {comment.votes}</Card.Link>

                            {loggedInUser.username === comment.author && 
                            <Button variant="danger" onClick={() => handleDeleteComment(comment.comment_id)}>
                                {isDeleting && comment.comment_id === commentIdToDelete ? 'Deleting...' : 'Delete'}
                            </Button>}
                        </Card>
                    </Col>
                )}
            </Row>
        </Container>
    )
}

export default CommentsSection
