import { useState, useEffect } from 'react'
import { fetchArticles } from '../api'
import ArticleCard from './ArticleCard'
import '../styling/ArticleList.css'

const ArticleList = () => {

    const [articles, setArticles] = useState([])
    const [loadingArticles, setLoadingArticles] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        setLoadingArticles(true)
        fetchArticles()
        .then(fetchedArticles => {
            setArticles(fetchedArticles)
            setLoadingArticles(false)
        })
        .catch(error => {
            setIsError(true)
            setLoadingArticles(false)
          })
    }, [])

    if (loadingArticles) return <p>Loading articles...</p>
    if (isError) return <p>Failed to fetch articles</p>

    return (
        <div>
            <h1>All Articles</h1>
            <div className='article-list'>
                {articles.map(article => 
                    <ArticleCard key={article.article_id} article={article} />
                )}
            </div>
        </div>
    )
}

export default ArticleList