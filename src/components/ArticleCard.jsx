import "../styling/ArticleCard.css"
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

const ArticleCard = ({ article }) => {
    return (
      <Card className="article-card">
        <Card.Img  className="article-img" variant="top" src={article.article_img_url} />
        <Card.Body className="card-body">
          <Card.Title id="article-title">{article.title}</Card.Title>
        </Card.Body>

        <ListGroup className="list-group-flush">
          <ListGroup.Item id="article-topic"> {article.topic}</ListGroup.Item>
          <ListGroup.Item>By {article.author}</ListGroup.Item>
          <ListGroup.Item>Created at: {new Date(article.created_at).toLocaleDateString()}</ListGroup.Item>
          <ListGroup.Item>
            <p>Votes: {article.votes}</p>
            <p>Comments: {article.comment_count}</p>
          </ListGroup.Item>
        </ListGroup>

        <Card.Link id="read-article" href={`/articles/${article.article_id}`}>Read Article</Card.Link>
      </Card>
    )
  }
  
  
  export default ArticleCard
  