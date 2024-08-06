import { useState, useEffect } from 'react'
import { fetchComments } from '../api'
import '../styling/CommentsSection.css'


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
                <ul>
                    {comments.map(comment => 
                        <li key={comment.comment_id} className='comment-card'>
                            <h3 id='author'>{comment.author}</h3>
                            <p id='date'>{new Date(comment.created_at).toDateString()}</p>
                            <p id='body'>{comment.body}</p>
                            <p>Votes: {comment.votes}</p>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default CommentsSection