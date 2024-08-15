const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helpers')
//const dummy = require('../utils/list_helpers').dummy

test('test a dummy', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5
    }
  ]

  const listWithTwoBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5
    },
    {
      _id: '5a422aa719999a676234d17f8',
      title: 'Some other blog',
      author: 'Wise person',
      url: 'https://someblog.com',
      likes: 45
    }
  ]

  const listWithThreeBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5
    },
    {
      _id: '5a422aa719999a676234d17f8',
      title: 'Some other blog',
      author: 'Wise person',
      url: 'https://someblog.com',
      likes: 45
    },
    {
      _id: 'a422aa719999a676234d17f8',
      title: 'null test',
      author: 'Wise person',
      url: 'https://someblog.com',
      likes: 0
    },
  ]
  test('When list contains only one item, it should equal 5', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('When list contains two items, it should equal 50', () => {
    const result = listHelper.totalLikes(listWithTwoBlogs)
    assert.strictEqual(result, 50)
  })

  test('When list contains three items, it should equal 50', () => {
    const result = listHelper.totalLikes(listWithThreeBlogs)
    assert.strictEqual(result, 50)
  })
})



