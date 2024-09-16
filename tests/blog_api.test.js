const { test, after, describe} = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const blogs = require('../models/blog')
require('express-async-errors')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const logger = require('../utils/logger')
const { getDocuments } = require('../utils/helpers')


describe('basic testing for routes', () => {

  test.only('get request returns a json', async() => {

    await api
      .get('/api/blogs/')
      .expect(200)
      .expect('Content-type', /application\/json/)

  })

  test.only('returns the correct amount of posts', async() => {

    const checkTheBlogsFromDB = await blogs.countDocuments({})
    //logger.info("printing", serverRequest)
    
    const response = await api.get('/api/blogs')
    //logger.info("printing", response.body.length)

    assert.deepEqual(response.body.length, checkTheBlogsFromDB)
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

  test.only('If title or url is missing return error 400', async () => {
    
    const newBlogMissingTitleAndUrl = {
      author: 'Clueless user',
      likes: 10
    }

    const response = await api.post('/api/blogs')
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .send(newBlogMissingTitleAndUrl)

  })

  test.only('Deletes one blog and verifies it', async () => {

    const getBlogs = await api.get('/api/blogs')


    const checkTheBlogsFromDB = await blogs.countDocuments({})
    //logger.info(getDocuments())
    const getBlogId = getBlogs.body[checkTheBlogsFromDB - 1].id
    logger.info('getBlogId is : ', getBlogId)

    const response = await api.delete(`/api/blogs/${getBlogId}`)
      .expect(204)

  })



  test.only('Updates one blog', async () => {

    const newUpdatedBlog = {
      title: "test",
      author: "test person",
      url: "www.test.com",
      likes: 1,
    }

    const checkTheBlogsFromDB = await blogs.countDocuments({})
    const getBlogs = await api.get('/api/blogs/')

    const getId = getBlogs.body[checkTheBlogsFromDB - 1].id
    logger.info("getId ", getId)

    await api.put(`/api/blogs/${getId}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .send(newUpdatedBlog)
    
    

  })

})

after (async () => {
  await mongoose.connection.close()
})

