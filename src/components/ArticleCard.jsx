import "../styling/ArticleCard.css"
import { Card, Col, Badge} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ArticleCard = ({ article }) => {
    return (
      <Card.Link className="read-article-link" as={Link} to={`/articles/${article.article_id}`}>
        <Card className="article-card">

          <Card.Body className="article-card-body">

            <Card.Subtitle className="text-muted article-card-subtitle">
              <Col className="article-card-author">
                <p>By {article.author}</p>
                <p className='article-card-date'>{new Date(article.created_at).toDateString()}</p>
              </Col>
              <Badge pill bg="info" className='flex justify-end'>
                <Card.Text className="article-card-topic">{article.topic}</Card.Text>
              </Badge>
            </Card.Subtitle>

            <Card.Title id="article-title">{article.title}</Card.Title>

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
  