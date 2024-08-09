import { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchArticleById, updateArticleVotes } from '../api'
import '../styling/SingleArticle.css'
import CommentsSection from './CommentsSection'
import CommentForm from './CommentForm'
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap'
import { UserContext } from '../contexts/User'
import { getVotedArticles, setVotedArticles } from '../utils/articleVotesLocalStorage'


const SingleArticle = () => {
    const { article_id } = useParams()
    const [article, setArticle] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const [updatedComments, setUpdatedComments] = useState(false)
    const { isLoggedIn } = useContext(UserContext)
    const [voteMessage, setVoteMessage] = useState('')
    const [isVoted, setIsVoted] = useState(false)





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

        // check if user has already voted for this article
        const votedArticles = getVotedArticles()
        setIsVoted(votedArticles.includes(article_id))
    }, [article_id, setUpdatedComments])



    const handleVote = (vote) => {
        if (!isLoggedIn) {
            setVoteMessage('Please log in to vote')
            return
        } 
        if (isVoted) {
            setVoteMessage('You have already voted for this article')
            return
        }

        // Optimistis rendering
        const newVote = article.votes + vote
        setArticle({ ...article, votes: newVote })
        setIsVoted(true)


        updateArticleVotes(article_id, vote)
        .then(() => {
            setIsVoted(true)
            // Store voted article in local storage
            const votedArticles = getVotedArticles()
            setVotedArticles([...votedArticles, article_id])
        })
        .catch(() => {
            setArticle({...article, votes: article.votes - vote})
            setError('Failed to update votes')
        })
    }


    // const handleCommentPosted = () => {
    //     setUpdatedComments(prevValue => !prevValue) // refresh comments section
    //         // if (typeof prevValue === 'boolean') return [comment]
    //         // else return [...prevValue, comment]
            
    // }

    
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
                            <div className="single-card-topic-container">
                                <Card.Link as={Link} to={`/topics/${article.topic}`} className="single-card-topic">{article.topic}</Card.Link>
                            </div>
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
            {voteMessage && <Alert variant="danger" className="mt-2">{voteMessage}</Alert>}

            <CommentForm article_id={article_id} setUpdatedComments={setUpdatedComments} />
            <Row>
                <CommentsSection article_id={article_id} setUpdatedComments={setUpdatedComments} updatedComments={updatedComments}/>
            </Row>
            <Card.Link as={Link} to="/articles">Back to Articles</Card.Link>
        </Container>
    )
}

export default SingleArticle
