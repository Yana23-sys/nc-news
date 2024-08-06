import axios from 'axios'

const api = axios.create({
    baseURL: 'https://nc-news-back-end-l734.onrender.com/api/',
})

export const fetchArticles = () => {
    return api.get(`/articles`)
      .then(response => {
        return response.data.articles})
      .catch(error => {
        console.error('Error getting items:', error)
        throw error
    })
}
