import { useState, useEffect } from 'react'
import { fetchArticles } from '../api'
import ArticleCard from './ArticleCard'
import '../styling/ArticleList.css'

const ArticleList = () => {

    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetchArticles().then(fetchedArticles => setArticles(fetchedArticles))
    }, [])

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