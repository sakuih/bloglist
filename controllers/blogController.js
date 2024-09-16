require('express-async-errors')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const mongoose = require('mongoose')
//const { errorHandler } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

blogRouter.post('/', async (request, response) => {
  
  let likes = request.body.likes
  if (request.body.likes === undefined)
   likes = 0

  const title = request.body.title
  const url = request.body.url

  if (title === undefined || url === undefined)
    return response.status(400).json({ error: 'Title and/or url are needed'})

  const newBlog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: likes,

  })
    
  const blog = await newBlog.save()
  response.status(201).json(blog)

})

blogRouter.delete('/:id', async (request, response) => {

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()

})

blogRouter.put('/:id', async (request, response) => {

  await Blog.findByIdAndUpdate(request.params.id, request.body)
  response.status(200).json(request.body)

})



//blogRouter.use(errorHandler)




module.exports = blogRouter
