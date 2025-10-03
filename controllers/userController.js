require('express-async-errors')
const User = require('../models/user')
const Blog = require('../models/blog')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
//const {exampleUser} = require('../utils/helpers')


usersRouter.post('/', async (request, response, error) => {
  const { username, name, password } = request.body
  //const allUserNames = await User.find({ username })

  //const usernameSearch = allUserNames.some( item => item === username)


  if (username.length < 3 || password.length < 3)
    response.status(400).json({"message" : "username and password should more than 3 characters long"})



  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)


  //const user123 = 

  const user = new User({
    username,
    name,
    passwordHash,
    //user123,
  })

  const savedUser = await user.save({})
  response.status(201).json(savedUser)

})

usersRouter.get('/', async(request, response) => {
  const users = await User.find().select('-passwordHash')

  const usersWithBlogs = []

  for (let user of users) {
    const blogs = await Blog.find({user: user._id })

    const userObj = user.toObject()

    userObj.blogs = blogs

    usersWithBlogs.push(userObj)
  }

  //const users = await User.find({}).populate('blogs')
  response.status(200).json(usersWithBlogs)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.find({"id" : request.params.id})
  response.status(200).json(user)
})

usersRouter.delete('/:id', async (request, response) => {
  const user = await User.findByIdAndDelete(request.params.id)
  response.status(200).json(user)
})

module.exports = usersRouter





