import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchArticleById } from '../api'
import '../styling/SingleArticle.css'
import CommentsSection from './CommentsSection'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'


const SingleArticle = () => {
    const { article_id } = useParams()
    const [article, setArticle] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    // const currentUser = 'grumpy19'

    useEffect(() => {
        fetchArticleById(article_id)
        .then(article => {
            setArticle(article)
            setLoading(false)
        })
        .catch(err => {
            setError(true)
            setLoading(false)
        })
    }, [article_id])

    if (loading) return <p>Loading article...</p>
    if (error) return <p>Failed to fetch article</p>
    if (!article) return <p>Article not found</p>

    return (
        <Container>
            <Row className="my-4 single-article-container">
                <Col md={7}>
                    <Card>
                        <Card.Body className="m-2">
                            <Card.Title className="mt-3 mb-3">{article.title}</Card.Title>
                            <Card.Subtitle className="mb-5 text-muted">
                               By {article.author} | {new Date(article.created_at).toDateString()}
                            </Card.Subtitle>
                            <div className="article-img-container">
                                <Card.Img variant="top" src={article.article_img_url} />
                            </div>
                            <Card.Text className="m-3 mt-5 mb-4">{article.body}</Card.Text>
                            {/* <Button variant="primary" onClick={() => alert('Edit functionality not yet implemented')}>
                                Edit
                            </Button> */}
                        </Card.Body>
                        <Card.Footer className="text-muted card-footer">
                            <p className='mb-0'>Votes: {article.votes}</p>
                            <Button variant="light">👍</Button>
                        </Card.Footer>
                    </Card>
                </Col> 
            </Row>
            <Row>
                <CommentsSection article_id={article_id} comment_count={article.comment_count}/>
            </Row>
            <Card.Link to="/articles">Back to Articles</Card.Link>
        </Container>
    )
}

export default SingleArticle

        // <div>
        //     <div className='article-top-card'>
        //         <h2>{article.title}</h2>
        //         <p>{article.topic}</p>
        //         <p>By {article.author}</p>
        //         <p>{new Date(article.created_at).toDateString()}</p>
        //     </div>
        //     <img src={article.article_img_url} alt={article.title} className='article-single-img'/>
        //     <p>Body: {article.body}</p>
        //     <p>Votes: {article.votes}</p>

        //     {/* {currentUser === article.author && <button>Edit Article</button>} */}
        //     <CommentsSection article_id={article_id} comment_count={article.comment_count}/>

        //     <Link to="/articles">Back to Articles</Link>
        // </div>