import { useState, useEffect } from 'react'
import { fetchArticles } from '../api'
import ArticleCard from './ArticleCard'
import '../styling/ArticleList.css'
// import { useParams } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

const ArticleList = ({ params, limit}) => {

    const [articles, setArticles] = useState([])
    const [loadingArticles, setLoadingArticles] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setLoadingArticles(true)
        fetchArticles({...params, limit })
        .then(fetchedArticles => {
            setArticles(fetchedArticles)
            setLoadingArticles(false)
        })
        .catch(error => {
            setIsError(true)
            setLoadingArticles(false)
          })
    }, [params, limit])

    if (loadingArticles) return <p>Loading articles...</p>
    if (isError) return <p>Failed to fetch articles</p>

    return (
        <Container className='article-list-container'>
            <Row xs={1} sm={2} md={2} lg={3} className="g-4">
                {articles.map((article, idx) => 
                    <Col key={idx}>
                        <ArticleCard key={article.article_id} article={article} />
                    </Col>
                )}
            </Row>
        </Container>
    )
}

export default ArticleList
// <div>
//     <div className='article-list'>
//         {articles.map(article => 
//             <ArticleCard key={article.article_id} article={article} />
//         )}
//     </div>
// </div>