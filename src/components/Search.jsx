import {Form, Button} from 'react-bootstrap'
import { useState } from 'react'

const Search = ({ onSubmit}) => {
   const [searchInput, setSearchInput] = useState("")

   const handleSearchChange = (event) => {
        setSearchInput(event.target.value)
   }

   const handleSearchSubmit = (event) => {
        event.preventDefault()
        
        if (searchInput !== "") {
            onSubmit(searchInput)
        }
   }

    return (
        <Form className="d-flex" onSubmit={handleSearchSubmit}>
            <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={handleSearchChange} 
                value={searchInput}
            />
            <Button variant="outline-success" type="submit">Search</Button>
        </Form>
    )
}

export default Search