import { useParams } from 'react-router-dom'
import ArticleList from './ArticleList'

const Topic = () => {
    const { topic } = useParams() 
    const slugFirstLetterCapital = topic.charAt(0).toUpperCase() + topic.slice(1)

    return (
        <div>
            <h1>{slugFirstLetterCapital}</h1>
            <ArticleList params={{ topic: topic }} />
        </div>

    )
} 

export default Topic