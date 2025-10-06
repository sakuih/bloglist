const User = require("../models/user")
const { createSecretToken } = require("../utils/secretToken")
const express = require('express')
const authRouter = express.Router()
const bcrypt = require("bcryptjs") 
const jwt = require('jsonwebtoken') 
require('dotenv').config()


authRouter.post('/register', async (req, res) => {
});


authRouter.post('/login', async (req, res) => {
})

module.exports = authRouter

