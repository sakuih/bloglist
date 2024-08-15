const logger = require('../utils/logger')
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0
  blogs.map((blog) => {
    total += blog.likes
  })
  return total
}

const favoriteBlog = (blogs) => {
  const reduce = blogs.reduce((mostLikes, blog) => {
    return blog.likes > mostLikes.likes ? blog : mostLikes
  }) 
  logger.info(reduce)

  if (reduce.likes === 0)
    return {error: "No favorites. Likes amount to zero"}

  return {title: reduce.title, author: reduce.author, likes: reduce.likes}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
