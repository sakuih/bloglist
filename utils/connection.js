const logger = require('./logger')
const config = require('./config')
const mongoose = require('mongoose')

const mongoUrl = config.MONGODB_URI

function connect() {

mongoose.connect(mongoUrl)
  .then(() => {
    logger.info('Connected to db')
  })
  .catch((error) => {
    logger.error('error connecting to the db:', error.message)
  })
}

module.exports = {
  connect
}
