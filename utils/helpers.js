const blogs = require('../models/blog')

async function getDocuments () {
    const checkTheBlogsFromDB = await blogs.countDocuments({})
    return checkTheBlogsFromDB
}



module.exports = {
  getDocuments
}

