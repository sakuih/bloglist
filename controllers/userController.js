require('express-async-errors')
const User = require('../models/user')
const Blog = require('../models/blog')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//const {exampleUser} = require('../utils/helpers')


usersRouter.post('/register', async (request, response, error) => {
  const { username, name, password } = request.body
  //const allUserNames = await User.find({ username })

  const existingUser = await User.findOne({ username })
  if (existingUser)
    return response.status(400).json({ message: 'User already exists'})
  //const usernameSearch = allUserNames.some( item => item === username)


  if (username.length < 4 || password.length < 4)
    response.status(400).json({"message" : "username and password should more than 3 characters long"})


  const salt = await bcrypt.genSalt(10)
  if (!salt)
    return response.status(400).json({message: "failed to generate salt"})
  const passwordHash = await bcrypt.hash(password, salt)
  console.log(passwordHash)
  console.log(password)

  try {
    const newUser = new User({
      username,
      name,
      passwordHash
    })
    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
  } catch (error) {
    response.status(500).json({message: error.message})
  }

})

usersRouter.post('/login', async (request, response) => {
  const { username, password } = request.body


  const user = await User.findOne({
    username
  })

  if (!user)
    return response.status(401).json({message: "Invalid username or password"})

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
  if (!isPasswordValid)
    return response.status(401).json({message: "Password is incorrect"})

  const payload = {
    id: user.id,
    username: user.username
  }

  const token = jwt.sign(payload, process.env.TOKEN_KEY, {expiresIn: '1h'})
  response.json({ token })
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





