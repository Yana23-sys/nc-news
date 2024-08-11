import { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchArticleById, updateArticleVotes } from '../api'
import '../styling/SingleArticle.css'
import CommentsSection from './CommentsSection'
import CommentForm from './CommentForm'
import { Container, Row, Col, Card, Button, Alert,Badge } from 'react-bootstrap'
import { UserContext } from '../contexts/User'
import { getVotedArticles, setVotedArticles } from '../utils/articleVotesLocalStorage'
import loadingAnimation  from '../assets/loadingAnimation.json' 
import Lottie from 'lottie-react'


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
            if (!article) setError('Article not found')
            else setArticle(article)
            setLoading(false)
        })
        .catch(err => {
            setError('Failed to load article')
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


    
    if (loading) return <Lottie animationData={loadingAnimation} style={{height: '200px', width: '200px'}} loop={true}/>
    if (error) return <Alert variant="danger">{error}</Alert>
    if (!article) return <Alert variant="danger">Article not found</Alert>

    return (
        <Container>
            <Row className="my-4 single-article-container">
                <Col md={8}>
                    <Card className="single-article-card">
                        <Card.Body className=" m-2 mt-0 pt-0">
                            <Card.Subtitle className="text-muted single-card-subtitle">
                            <Col className="single-card-author">
                                <p>By {article.author}</p>
                                <p className='single-card-date'>{new Date(article.created_at).toLocaleString()}</p>
                            </Col>
                            <Badge pill bg="info" className='flex justify-end'>
                                <Card.Link as={Link} to={`/topics/${article.topic}`} className="single-card-topic">{article.topic}</Card.Link>
                            </Badge>
                            </Card.Subtitle>
                            <Card.Title className="mt-4 mb-4 single-card-title"><h2>{article.title}</h2></Card.Title>
                            <div >
                                <Card.Img src={article.article_img_url} className='single-card-img' alt={article.title}/>
                                <Card.Text className="single-card-body">{article.body}</Card.Text>
                            </div>
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
                    {voteMessage && <Alert variant="danger" className="mt-2">{voteMessage}</Alert>}
                    <CommentForm article_id={article_id} setUpdatedComments={setUpdatedComments} />
                </Col> 
            </Row>

            <Row >
                <Col md={{ span: 8, offset: 2 }}>
                    <CommentsSection article_id={article_id} setUpdatedComments={setUpdatedComments} updatedComments={updatedComments}/>
                </Col>
            </Row>
            <Card.Link as={Link} to="/articles">Back to Articles</Card.Link>
        </Container>
    )
}

export default SingleArticle
