require('express-async-errors')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

blogRouter.post('/', async (request, response) => {
  
  //const blog = new Blog(request.body)
  const newBlog = new Blog(request.body)
  const blog = await newBlog.save()
  response.status(201).json(blog)

  //blog
    //.save()
    //.then(result => {
    //  response.status(201).json(result)
    //})
})





module.exports = blogRouter
