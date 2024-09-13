require('express-async-errors')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

blogRouter.post('/', async (request, response) => {
  
  let likes = request.body.likes
  if (request.body.likes === undefined)
   likes = 0 

  const newBlog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: likes,

  })
  const blog = await newBlog.save()
  response.status(201).json(blog)

  //blog
    //.save()
    //.then(result => {
    //  response.status(201).json(result)
    //})
})





module.exports = blogRouter
