import { Link } from "react-router-dom"
import '../styling/Header.css'

const Header = () => {
    
    return (
        <header>
            <h1>NC News</h1>
            <nav>
                <ul>
                    <li><Link to="/" >Home</Link></li>
                    <li><Link to="/articles" >Articles</Link></li>
                    <li>Topics</li>
                    <li><Link to="/profile" >My Profile</Link></li>
                    <li>Search</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header