import './styling/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from "react-router-dom"
import Header from './components/Header.jsx'
import ArticleList from './components/ArticleList.jsx'
import SingleArticle from './components/SingleArticle.jsx'
import Home from './components/Home.jsx'
import Users from './components/Users.jsx'

function App() {

  return (
      <>
        <Header />

        <main className="app-main">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/articles" element={<ArticleList/>} />
                <Route path="/articles/:article_id" element={<SingleArticle/>}/>
                <Route path="/users" element={<Users />} />
            </Routes>
        </main>
      </>
  )
}

export default App
