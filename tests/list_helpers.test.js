const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helpers')
//const dummy = require('../utils/list_helpers').dummy

describe('dummy test', () => {
  test('test a dummy', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
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

describe('Favorite blog', () => {
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
    },
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
      _id: '6a422aa719999a676234d17f8',
      title: 'blogger',
      author: 'Person',
      url: 'https://someblog.com',
      likes: 45
    },
    {
      _id: '5a422aa719999a676234d17f8',
      title: 'Some other blog',
      author: 'Wise person',
      url: 'https://someblog.com',
      likes: 45
    },
  ]

  const listWithNullValues = [

    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 0
    },
    {
      _id: '6a422aa719999a676234d17f8',
      title: 'blogger',
      author: 'Person',
      url: 'https://someblog.com',
      likes: 0
    },
  ]

  test('When list contains two items, it should return the one with the most likes', () => {
    const result = listHelper.favoriteBlog(listWithTwoBlogs)
    assert.deepStrictEqual(result, {title: 'Some other blog', author: 'Wise person', likes: 45} )
  })

  test('When list contains many favorites, it should return the top one', () => {
    const result = listHelper.favoriteBlog(listWithThreeBlogs)
    assert.deepStrictEqual(result, {title: 'blogger', author: 'Person', likes: 45} )
  })

  test('When list has only zero values, it should return an error', () => {
    const result = listHelper.favoriteBlog(listWithNullValues)
    assert.deepStrictEqual(result, {error: "No favorites. Likes amount to zero"} )
  })
})



