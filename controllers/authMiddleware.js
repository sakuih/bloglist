const User = require("../models/User")
const { createSecretToken } = require("../util/SecretToken")
const authRouter = require('express').Router()
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
require('dotenv').config()




authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })

  if (!user) {
    return res.status(401).json({message: "User not found"})
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return res.status(401).json({message: "Invalid username or password"})
  }

  const token = jwt.sign({ username: user.username}, process.env.TOKEN_KEY, {expiresIn: '1h'})
  res.json({ token })
   
})
