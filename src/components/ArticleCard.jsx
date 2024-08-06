import "../styling/ArticleCard.css"
import { Link } from "react-router-dom"

const ArticleCard = ({ article }) => {
    return (
      <div className="article-card">
            <img src={article.article_img_url} alt={article.title} className="article-img"/>
            <div className="card-body">
                <h2>{article.title}</h2>
                <p>Topic: {article.topic}</p>
                <p>By {article.author}</p>
                <p>Created at: {new Date(article.created_at).toLocaleDateString()}</p>
                <p>Votes: {article.votes}</p>
                <p>Comments: {article.comment_count}</p>
                <Link to={`/articles/${article.article_id}`}>Read Article</Link>
            </div>
      </div>
    )
  }
  
  export default ArticleCard
  