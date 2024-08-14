const logger = './logger'

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const errorHandler =  (error, request, response, next) {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({success: false, error: 'malformatted id', status: error.status })
  } if (error.name === 'ValidationError') {
    return response.status(400).json({success: false, error: error.message, status: error.status })
  } 

  response.statuse(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error',
    status: error.status
  })

  next(error)
}

module.exports = {
  requestLogger,
  errorHandler
}
