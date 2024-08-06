import { useState, useEffect } from 'react'
import { fetchComments } from '../api'

const CommentsSection = ({ article_id }) => {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')

    useEffect(() => {
        fetchComments(article_id).then(fetchedComments => setComments(fetchedComments))
    }, [article_id])


    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (
        <div>
            <h2>Comments</h2>
            <form onSubmit={handleSubmit}>
                <textarea value={newComment} onChange={event => setNewComment(event.target.value)}/>
                <button type="submit">Add Comment</button>
            </form>
            <ul>
                {comments.map(comment => 
                    <li key={comment.comment_id}>
                        <h3>{comment.author}</h3>
                        <p>{new Date(comment.created_at).toLocaleDateString()}</p>
                        <p>{comment.body}</p>
                        <p>Votes: {comment.votes}</p>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default CommentsSection