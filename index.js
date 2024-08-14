const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogController')
const connection = require('./utils/connection')

connection.connect()

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)


app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
