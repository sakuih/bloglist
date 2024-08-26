const { test, after, describe} = require('node:test')
const mongoose = require('mongoose')
require('express-async-errors')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('basic testing for routes', () => {

  test.only('get request returns a json', async() => {

    await api
      .get('/api/blogs/')
      .expect(200)
      .expect('Content-type', /application\/json/)
    
      //.expect('Content-type', 'application/json; charset=utf-8')
  })

  test.only('post request returns success', async() => {

    await api
      .post('/api/blogs/')
      .expect(201)
      .expect('Content-type', /application\/json/)
    
  })

  after (async () => {
    await mongoose.connection.close()
  })

})









