require('express-async-errors')
const User = require('../models/user')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')


usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save({})
  
  response.status(201).json(savedUser)

})

usersRouter.get('/', async(request, response) => {
  const users = await User.find({})
  response.status(200).json(users)
})

module.exports = usersRouter





