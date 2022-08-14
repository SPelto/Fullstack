const dummy = (blogs) => {
  return (
    1
  )
}

const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

module.exports = {
  dummy
}