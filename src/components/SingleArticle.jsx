import { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'
import { fetchArticleById, updateArticleVotes } from '../api'
import '../styling/SingleArticle.css'
import CommentsSection from './CommentsSection'
import CommentForm from './CommentForm'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'


const SingleArticle = () => {
    const { article_id } = useParams()
    const [article, setArticle] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    // const currentUser = 'grumpy19'
    const [updatedComments, setUpdatedComments] = useState(false)

    useEffect(() => {
        fetchArticleById(article_id)
        .then(article => {
            setArticle(article)
            setLoading(false)
        })
        .catch(err => {
            setError('Failed to load article.')
            setLoading(false)
        })
    }, [article_id, updatedComments])


    const handleVote = (vote) => {
        const newVote = article.votes + vote
        setArticle({ ...article, votes: newVote })

        updateArticleVotes(article_id, vote)
        .catch(() => {
            setArticle({...article, votes: article.votes - vote})
            setError('Failed to update votes.')
        })
    }


    const handleCommentPosted = () => {
        setUpdatedComments(true) // refresh comments section
    }


    if (loading) return <p>Loading article...</p>
    if (error) return <Alert variant="danger">{error}</Alert>
    if (!article) return <Alert variant="danger">Article not found</Alert>

    
    return (
        <Container>
            <Row className="my-4 single-article-container">
                <Col xs={3} sm={5} md={7} lg={8}>
                    <Card>
                        <Card.Body className="m-2">
                            <Card.Title className="mt-3 mb-3">{article.title}</Card.Title>
                            <Card.Subtitle className="text-muted single-card-subtitle">
                            <p>By {article.author}</p>
                            <p>{new Date(article.created_at).toDateString()}</p>
                            </Card.Subtitle>
                            <div className="article-img-container">
                                <Card.Img variant="top" src={article.article_img_url} />
                            </div>
                            <Card.Text className="m-3 mt-5 mb-4">{article.body}</Card.Text>
                            {/* <Button variant="primary" onClick={() => alert('Edit functionality not yet implemented')}>
                                Edit
                            </Button> */}
                        </Card.Body>
                        <Card.Footer className="text-muted single-card-footer">
                            <p className='mb-0'>Votes: {article.votes}</p>
                            <Button variant="success" onClick={() => handleVote(1)}>👍</Button>
                            <Button variant="danger" onClick={() => handleVote(-1)}>👎</Button>
                        </Card.Footer>
                    </Card>
                </Col> 
            </Row>
            <CommentForm article_id={article_id} handleCommentPosted={handleCommentPosted}/>
            <Row>
                <CommentsSection article_id={article_id} comment_count={article.comment_count}/>
            </Row>
            <Card.Link to="/articles">Back to Articles</Card.Link>
        </Container>
    )
}

export default SingleArticle
