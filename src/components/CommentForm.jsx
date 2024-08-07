import { useState } from 'react'
import { Button, Form, Alert } from 'react-bootstrap'
import { postComment } from '../api' // Function to post comment to the backend
import '../styling/CommentsSection.css'


const CommentForm = ({ article_id, handleCommentPosted }) => {
    const [comment, setComment] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const currentUser = 'grumpy19'



    const handleSubmit = (event) => {
        event.preventDefault()

        if (comment === '') {
            setError('Comment cannot be empty')
            return
        }

        setIsSubmitting(true)

        postComment(article_id, { body: comment, username: currentUser })
            .then(() => {
                setSuccess('Comment posted successfully!')
                setComment('')
                handleCommentPosted() // refresh comments in singleArticle -> CommentsSection
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

