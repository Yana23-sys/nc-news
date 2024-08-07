import "../styling/ArticleCard.css"
import Card from 'react-bootstrap/Card'

const ArticleCard = ({ article }) => {
    return (
      <Card.Link className="read-article-link" href={`/articles/${article.article_id}`}>
        <Card className="article-card">

          <Card.Body className="article-card-body">

            <Card.Subtitle className="article-card-subtitle">
              <p>By {article.author}</p>
              <p>{new Date(article.created_at).toDateString()}</p>
            </Card.Subtitle>

            <Card.Title id="article-title">{article.title}</Card.Title>

            <Card.Text className="article-card-topic">{article.topic}</Card.Text>

            <Card.Img  className="article-img" variant="top" src={article.article_img_url} />

          </Card.Body>

          <Card.Footer className="article-card-footer">
            <p>Votes: {article.votes}</p>
            <p>Comments: {article.comment_count}</p>
          </Card.Footer>

        </Card>
      </Card.Link>
    )
  }
  
  
  export default ArticleCard
  