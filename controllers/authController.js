const User = require("../models/user")
const { createSecretToken } = require("../utils/secretToken")
const express = require('express')
const authRouter = express.Router()
const bcrypt = require("bcryptjs") 
const jwt = require('jsonwebtoken') 
require('dotenv').config()


authRouter.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username })
  if (existingUser)
    return res.status(400).json({ message: 'User already exists'})


  const salt = await bcrypt.genSalt(10)
  if (!salt)
    return res.status(400).json({message: "failed to generate salt"})
  const hashedPassword = await bcrypt.hash(password, salt)
  console.log(password)
  console.log(hashedPassword)

  try {
    const newUser = new User({ username, hashedPassword });
    const savedUser = await newUser.save();

    res.status(201).json({ savedUser });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


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

module.exports = authRouter

