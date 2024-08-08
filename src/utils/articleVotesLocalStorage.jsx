// to get the list of voted articles from local storage
export const getVotedArticles = () => {
    const votedArticles = localStorage.getItem('votedArticles')
    return votedArticles ? JSON.parse(votedArticles) : []
}

// to set the list of voted articles in local storage
export const setVotedArticles = (articles) => {
    localStorage.setItem('votedArticles', JSON.stringify(articles))
}