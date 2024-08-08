import { useState } from 'react'
import { Button, Form, Alert } from 'react-bootstrap'
import { postComment } from '../api' 
import '../styling/CommentsSection.css'
import { UserContext } from '../contexts/User'
import { useContext } from 'react'


const CommentForm = ({ article_id, setUpdatedComments }) => {
    const [comment, setComment] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    // const currentUser = 'grumpy19'
    const { isLoggedIn, loggedInUser } = useContext(UserContext)



    const handleSubmit = (event) => {
        event.preventDefault()

        if (!isLoggedIn) {
            setError('Please log in to post a comment')
            return
        }
        
        if (comment === '') {
            setError('Comment cannot be empty')
            return
        }

        setIsSubmitting(true)
        const newComment = { body: comment, username: loggedInUser.username }

        postComment(article_id, newComment)
            .then(() => {
                setUpdatedComments(prevValue => !prevValue)
                setSuccess('Comment posted successfully!')
                setComment('')
            })
            .catch(() => {
                setError('Failed to post comment. Please try again.')
            })
            .finally(() => {
                setIsSubmitting(false)
            })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="commentBody" className="mb-3 form-comment-container">
                <Form.Label className='comment-form-label'><h3>Leave a comment</h3></Form.Label>
                <Form.Control as="textarea" rows={3} value={comment} onChange={(event) => setComment(event.target.value)} disabled={isSubmitting}
                />
                 <div className="form-button-container">
                    <Button type="submit" disabled={isSubmitting} className="mb-2" variant="success">
                        {isSubmitting ? 'Submitting...' : 'Post Comment'}
                    </Button>
                </div>
                {error && <Alert variant="danger" className="mt-2">{error}</Alert>}
                {success && <Alert variant="success" className="mt-2">{success}</Alert>}
            </Form.Group>
        </Form>

    )
}

export default CommentForm

