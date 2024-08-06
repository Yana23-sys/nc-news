import "../styling/ArticleCard.css"
import { Link } from "react-router-dom"

const ArticleCard = ({ article }) => {
    return (
      <div className="article-card">
            <img src={article.article_img_url} alt={article.title} className="article-img"/>
            <div className="card-body">
                <h3>{article.title}</h3>
                <p id="article-topic">Topic: {article.topic}</p>
                <p id="article-author">By {article.author}</p>
                <p id="article-date">Created at: {new Date(article.created_at).toLocaleDateString()}</p>
                <p id="article-votes">Votes: {article.votes}</p>
                <p id="article-comments">Comments: {article.comment_count}</p>
                <Link to={`/articles/${article.article_id}`}>Read Article</Link>
            </div>
      </div>
    )
  }
  
  
  export default ArticleCard
  