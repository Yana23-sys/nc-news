import ArticleList from './ArticleList'
import { Dropdown, Row, Col, DropdownItemText} from 'react-bootstrap'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const AllArticles = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [sortBy, setSortBy] = useState(searchParams.get('sort_by') ||'created_at')
    const [order, setOrder] = useState(searchParams.get('order') || 'desc')

    const handleSort = (sortBy, order) => {
        setSortBy(sortBy)
        setOrder(order)
        setSearchParams({sort_by: sortBy, order: order})
    }

    return (
        <div>
            <Row className='flex justify-content-between align-items-center' style={{'margin-top': '30px'}} >
                <Col style={{textAlign: 'left'}}>
                    <h1 >All Articles</h1>
                </Col>
                <Col style={{textAlign: 'right'}}>
                    <Dropdown >
                        <Dropdown.Toggle variant="success"  id="dropdown-basic">
                            Filter
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <DropdownItemText>Sorted By: {sortBy==='created_at' ? 'Date' : sortBy==='votes' ? 'Votes' : 'Comment Count'}  |  Order: {order==='asc' ? 'Ascending' : 'Descending'}</DropdownItemText>
                            <Dropdown.Header>Sort by:</Dropdown.Header>
                            <Dropdown.Item as="button" onClick={() => handleSort('created_at', order)}>Date</Dropdown.Item>
                            <Dropdown.Item as="button" onClick={() => handleSort('votes', order)}>Votes</Dropdown.Item>
                            <Dropdown.Item as="button" onClick={() => handleSort('comment_count', order)}>Comment Count</Dropdown.Item>

                            <Dropdown.Divider />
                            <Dropdown.Header>Order by:</Dropdown.Header>
                            <Dropdown.Item onClick={() => handleSort(sortBy, 'asc')}>
                                    Ascending
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSort(sortBy, 'desc')}>
                                    Descending
                                </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <ArticleList params={{sort_by: sortBy, order: order}}/>
        </div>
    )
}

export default AllArticles