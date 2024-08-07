import { useEffect, useState } from 'react'
import ArticleList from './ArticleList'
import '../styling/Home.css'


const Home = () => {
    const newestArticlesParams = { sort_by: 'created_at', order: 'desc' }
    const popularArticlesParams = { sort_by: 'votes', order: 'desc' }

    return (
        <div>
            <h1 id='home-title'>Hello, User!</h1>
            <div>
                <h2>Newest Articles</h2>
                <ArticleList params={newestArticlesParams} limit={3}/>
            </div>
            <div>
                <h2>Most Popular Articles</h2>
                <ArticleList params={popularArticlesParams} limit={3}/>
            </div>

        </div>
    )
}

export default Home