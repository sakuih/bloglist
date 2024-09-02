const { test, after, describe} = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const blogs = require('../models/blog')
require('express-async-errors')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const logger = require('../utils/logger')

describe('basic testing for routes', () => {

  test.only('get request returns a json', async() => {

    await api
      .get('/api/blogs/')
      .expect(200)
      .expect('Content-type', /application\/json/)

    
  })

  test.only('returns the correct amount of posts', async() => {

    const serverRequest = await blogs.countDocuments({})
    //logger.info("printing", serverRequest)
    
    const response = await api.get('/api/blogs')
    //logger.info("printing", response.body.length)

    assert.deepEqual(response.body.length, serverRequest)
  })

  test.only('Test for _id and id', async() => {

    const request = await api.get('/api/blogs')
    logger.info(request.body[0].id)
    logger.info(request.body)

    assert.notStrictEqual(request.body[0]._id, undefined)


  })

  test('post request returns success', async() => {

    await api
      .post('/api/blogs/')
      .expect(201)
      .expect('Content-type', /application\/json/)
    
  })

  

})

after (async () => {
  await mongoose.connection.close()
})








