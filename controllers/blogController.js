require('express-async-errors')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const {getExampleUser} = require('../utils/helpers')
const {authenticateJWT} = require('../utils/middleware')
//const { errorHandler } = require('../utils/middleware')


blogRouter.get('/', async (request, response) => {

  /*
  const users = await User.find().select('-passwordHash')

  const usersWithBlogs = []

  for (let user of users) {
    const blogs = await Blog.find({user: user._id })

    const userObj = user.toObject()

    userObj.blogs = blogs

    usersWithBlogs.push(userObj)
  }
  */

  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
  response.status(200).json(blogs)
})

blogRouter.post('/', authenticateJWT, async (request, response) => {
  const title = request.body.title
  const url = request.body.url
  let likes = request.body.likes

  if (request.body.likes === undefined)
   likes = 0

  if (title === undefined || url === undefined)
    return response.status(400).json({ error: 'Title and/or url are needed'})

  //const exampleUser = await User.findById("66e9877a3c4f399faa7ded5a")

  const newBlog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: likes,
    user: request.user.id,

  })
    
  const blog = await newBlog.save()
  response.status(201).json(blog)

})

blogRouter.delete('/:id', authenticateJWT, async (request, response) => {

  const jwtUser = request.user.id

  const dbBlog = await Blog.findById(request.params.id)

  const dbUser = dbBlog.user.toString()
  console.log("user", dbUser)
  console.log("user", jwtUser)


  if (jwtUser !== dbUser) {
    console.log("user is not the owner of the blog")
    response.status(403).end()
  }

  if (jwtUser === dbUser) {
    console.log("user can be deleted")
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }

})

blogRouter.put('/:id', async (request, response) => {

  await Blog.findByIdAndUpdate(request.params.id, request.body)
  response.status(200).json(request.body)

})

//blogRouter.use(errorHandler)

module.exports = blogRouter
