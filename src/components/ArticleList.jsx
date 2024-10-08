import { useState, useEffect } from 'react'
import { fetchArticles } from '../api'
import ArticleCard from './ArticleCard'
import '../styling/ArticleList.css'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import loadingAnimation  from '../assets/loadingAnimation.json' 
import Lottie from 'lottie-react'

const ArticleList = ({ params, limit}) => {

    const [articles, setArticles] = useState([])
    const [loadingArticles, setLoadingArticles] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        setLoadingArticles(true)
        fetchArticles({...params, limit })
        .then(fetchedArticles => {
            setArticles(fetchedArticles)
            setLoadingArticles(false)
        })
        .catch(error => {
            setError('Failed to fetch articles')
            setLoadingArticles(false)
          })
    }, [params, limit])

    if (error) return <Alert variant="danger">{error}</Alert>
    if (loadingArticles) return (
        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            <Lottie animationData={loadingAnimation} style={{height: '100px', width: '100px'}} loop={true}/>
        </div>
    )

    return (
        <Container className='article-list-container'>
            <Row className="g-4" xs={1} sm={2} md={2} lg={3}>
                {articles.map((article, idx) => 
                    <Col key={idx} style={{width: articles.length === 1 ? '100%' : ''}}>
                        <ArticleCard key={article.article_id} article={article} />
                    </Col>
                )}
            </Row>
        </Container>
    )
}

export default ArticleList