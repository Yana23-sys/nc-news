import axios from 'axios'

const api = axios.create({
    baseURL: 'https://nc-news-back-end-l734.onrender.com/api/',
})

export const fetchArticles = (params) => {
    return api.get(`/articles`, { params})
      .then(response => {
        return response.data.articles})
      .catch(error => {
        console.error('Error getting items:', error)
        throw error
    })
}

export const fetchArticleById = (article_id) => {
  return api.get(`/articles/${article_id}`)
    .then(response => {
      return response.data})
    .catch(error => {
      console.error('Error getting items:', error)
      throw error
  })
}

export const fetchComments = (article_id) => {
  return api.get(`/articles/${article_id}/comments`)
    .then(response => {
      return response.data})
    .catch(error => {
      console.error('Error getting items:', error)
      throw error
  })
}

export const updateArticleVotes = (article_id, vote) => {
  return api.patch(`/articles/${article_id}`, { inc_votes: vote })
    .then(response => response.data)
    .catch(error => {
        console.error('Error updating votes:', error)
        throw error
    })
}

export const postComment = (article_id, comment) => {
  return api.post(`/articles/${article_id}/comments`, comment)
    .then(response => response.data)
    .catch(error => {
        console.error('Error posting comment:', error)
        throw error
    })
}

export const fetchUsers = () => {
    return api.get('/users')
        .then(response => response.data) 
        .catch(error => {
            console.error('Error fetching users:', error)
            throw error
        })
}

export const deleteComment = (comment_id) => {
    return api.delete(`/comments/${comment_id}`)
        .then(response => {
            console.log('Deleted comment:', response.data)
            response.data
        })
        .catch(error => {
            console.error('Error deleting comment:', error)
            throw error
        })
}

export const fetchTopics = () => {
    return api.get('/topics')
        .then(response => response.data) 
        .catch(error => {
            console.error('Error fetching topics:', error)
            throw error
        })
}