import ArticleList from './ArticleList'
import { Dropdown, Row, Col, DropdownItemText, Form} from 'react-bootstrap'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../styling/AllArticles.css'

const AllArticles = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [sortBy, setSortBy] = useState(searchParams.get('sort_by') ||'created_at')
    const [order, setOrder] = useState(searchParams.get('order') || 'desc')
    const search = searchParams.get('q') || ''

    const handleSort = (sortBy, order) => {
        setSortBy(sortBy)
        setOrder(order)
        setSearchParams({sort_by: sortBy, order: order, q: search})
    }


    return (
        <div style={{width: '100%'}}>
            <h1 >All Articles</h1>
            <div className="article-filters">
                <Form.Group as={Row} className="mb-3 article-filter" controlId="sortBy">
                    <Form.Label column xs="3" sm="3" >
                        Sort By
                    </Form.Label>
                    <Col xs="6" sm="7" >
                        <Form.Select size="sm" value={sortBy} aria-label="Sort By" onChange={(e) => handleSort(e.target.value, order)}>
                            <option value="created_at">Date</option>
                            <option value="votes">Votes</option>
                            <option value="comment_count">Comment Count</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
                 
                <Form.Group as={Row} className="mb-3 article-filter" controlId="orderBy" >
                    <Form.Label column xs="3" sm="4">
                        Order By
                    </Form.Label>
                    <Col xs="6" sm="6">
                        <Form.Select size="sm" value={order} aria-label="Order By" onChange={(e) => handleSort(sortBy, e.target.value)}>
                            <option value="desc">Descending</option>
                            <option value="asc">Ascending</option>
                        </Form.Select>
                    </Col>
                </Form.Group>
            </div>
            <ArticleList params={{sort_by: sortBy, order: order, search}}/>
        </div>
    )
}

export default AllArticles