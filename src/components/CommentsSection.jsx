import { useState, useEffect, useContext } from 'react'
import { fetchComments, deleteComment } from '../api'
import '../styling/CommentsSection.css'
import { Card, Col, Row, Container, Button } from 'react-bootstrap'
import { UserContext } from '../contexts/User'
import loadingAnimation  from '../assets/loadingAnimation.json' 
import Lottie from 'lottie-react'




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

    

    return (
        <Container className='comment-list'>
            <h3>Comments: {comments.length}</h3>

            {loading && <Lottie animationData={loadingAnimation} style={{height: '100px', width: '100px'}} loop={true}/>}

            {error && <Alert variant="danger" className="mt-2">{error}</Alert>}

            <Row xs={1} style={{maxHeight: '300px', overflowY: 'auto'}}>
                {comments.map((comment, idx) => 
                    <Col key={idx}>
                        <Card border="light" className='one-comment-card' key={comment.comment_id}>
                            <Card.Header>{comment.author}</Card.Header>

                            <Card.Text className="card-date text-muted">{new Date(comment.created_at).toLocaleString()}</Card.Text>
                            <Card.Body>
                                <Card.Text >{comment.body}</Card.Text>
                            </Card.Body>
                            <div className="d-flex justify-content-between" style={{marginRight: '20px', width: '100%', padding:'0 10px 10px 10px'}}>
                                <Card.Text>Votes: {comment.votes}</Card.Text>
                                {loggedInUser.username === comment.author && 
                                <Button variant="danger" onClick={() => handleDeleteComment(comment.comment_id)} size="sm" style={{height: '25px', padding: '0 10px'}}>
                                    {isDeleting && comment.comment_id === commentIdToDelete ? 'Deleting...' : 'Delete'}
                                </Button>}
                            </div>
                        </Card>
                    </Col>
                )}
            </Row>
        </Container>
    )
}

export default CommentsSection
