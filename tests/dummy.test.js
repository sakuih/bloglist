const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helpers')
//const dummy = require('../utils/list_helpers').dummy

test('test a dummy', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})



