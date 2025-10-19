const logger = './logger'
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({success: false, error: 'malformatted id', status: error.status })
  } if (error.name === 'ValidationError') {
    return response.status(400).json({success: false, error: error.message, status: error.status })
  } if (error.status) {
    return response.status(error.status).json({success: false, error: error.message, status: error.status})
  } 

  else {
    response.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error',
    status: error.status
  })
  } 
  
  next(error)
}



const authenticateJWT = (req, res, next) => {
  //const token = req.headers['authorization']?.split(' ')[1]
  const authHeader = req.headers['authorization']

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(403).json({message: 'Token is missing or invalid'})

  const token = authHeader.split(' ')[1]

  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err)
      return res.status(403).json({message: `Invalid token ${err.message}`})

    req.user = user
    next()
  })
  
}


module.exports = authenticateJWT

module.exports = {
  requestLogger,
  errorHandler,
  authenticateJWT
}
