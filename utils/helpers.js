const blogs = require('../models/blog')
const users = require('../models/user')

async function getExampleUser () {
  const getUser = await users.findById("67068a95232f70c743be5685")

  return getUser
}


async function getDocuments () {
    const checkTheBlogsFromDB = await blogs.countDocuments({})
    return checkTheBlogsFromDB
}





module.exports = {
  getDocuments,
  getExampleUser
}

