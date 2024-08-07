import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchArticleById } from '../api'
import '../styling/SingleArticle.css'
import CommentsSection from './CommentsSection'


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
        <div>
            <div className='article-top-card'>
                <h2>{article.title}</h2>
                <p>{article.topic}</p>
                <p>By {article.author}</p>
                <p>{new Date(article.created_at).toDateString()}</p>
            </div>
            <img src={article.article_img_url} alt={article.title} className='article-single-img'/>
            <p>Body: {article.body}</p>
            <p>Votes: {article.votes}</p>

            {/* {currentUser === article.author && <button>Edit Article</button>} */}
            <CommentsSection article_id={article_id} comment_count={article.comment_count}/>

            <Link to="/articles">Back to Articles</Link>
        </div>
    )
}

export default SingleArticle