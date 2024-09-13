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
    //logger.info(request.body[0].id)
    //logger.info(request.body)

    assert.notStrictEqual(request.body[0].id, undefined)

  })


  test.only('post request returns success', async() => {

    const newBlog = {
      title: "Introduction to C++",
      author: "John the tester",
      url: "www.testcpp.com",
      likes: 5,
    }

    const checkTheBlogsFromDB = await blogs.countDocuments({})

    const response = await api.post('/api/blogs')
      .expect(201)
      .expect('Content-type', /application\/json/)
      .send(newBlog)

    const getBlogs = await api.get('/api/blogs')
    
    //logger.info("getBlogs", getBlogs)
    const getSelectedBlog = getBlogs.body.map((blog) => blog.title)
    //logger.info("getSelectedBlog", getSelectedBlog[getSelectedBlog.length - 1])

    assert.deepEqual(checkTheBlogsFromDB + 1, getBlogs.body.length)
    assert.deepEqual(getSelectedBlog[getSelectedBlog.length - 1], newBlog.title )
  })


  test.only('Check if the likes property exists and if not declare it to null', async() => {

    const newBlogMissingLikes = {
      title: "Introduction to web development",
      author: "Jane the tester",
      url: "www.web.dev",
    }

    const response = await api.post('/api/blogs')
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .send(newBlogMissingLikes)
      
    //logger.info("response.body.likes", response.body.likes)
    
    assert.strictEqual(response.body.likes, 0)
  


  })

  

})

after (async () => {
  await mongoose.connection.close()
})








