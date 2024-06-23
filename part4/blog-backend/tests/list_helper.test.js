const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe("total likes", () => {
  const list = [
    { likes: 3 },
    { likes: 2 },
    { likes: 1 }
  ]

  test("Of empty list is zero", () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test("When list has only one blog equals the likes of that", () => {
    assert.strictEqual(listHelper.totalLikes([list[0]]), list[0].likes)
  })

  test("Of a bigger list is calculated right", () => {
    assert.strictEqual(listHelper.totalLikes(list), 6)
  })
})

describe("favorite blog", () => {
  const list = [
    { title: "foo", likes: 3 },
    { title: "bar", likes: 2 },
    { title: "test", likes: 1 }
  ]

  test("Of empty list is null", () => {
    assert.deepStrictEqual(listHelper.favoriteBlog([]), null)
  })

  test("When list has only one blog equals that blog", () => {
    assert.deepStrictEqual(listHelper.favoriteBlog([list[0]]), list[0])
  })

  test("Of a bigger list is the one with most likes", () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(list), list[0])
  })
})

describe("most blogs", () => {
  const list = [
    {author: "foo"},
    {author: "foo"},
    {author: "foo"},
    {author: "bar"},
    {author: "bar"},
    {author: "test"},
  ]

  test("Of empty list is null", () => {
    assert.strictEqual(listHelper.mostBlogs([]), null)
  })

  test("When list has only one blog equals its author", () => {
    assert.deepStrictEqual(listHelper.mostBlogs([list[0]]), { author: "foo", blogs: 1 })
  })

  test("Of a bigger list is the one with most blogs", () => {
    assert.deepStrictEqual(listHelper.mostBlogs(list), { author: "foo", blogs: 3 })
  })
})

describe('most likes', () => {
  const list = [
    { likes: 1, author: "foo" },
    { likes: 2, author: "foo" },
    { likes: 3, author: "foo" },
    { likes: 4, author: "bar" },
    { likes: 10, author: "bar" },
    { likes: 6, author: "test" },
  ]

  test("Of empty list is null", () => {
    assert.strictEqual(listHelper.mostLikes([]), null)
  })

  test("When list has only one blog equals its author", () => {
    assert.deepStrictEqual(listHelper.mostLikes([list[0]]), { author: "foo", likes: 1 })
  })

  test("Of a bigger list is the one with most likes", () => {
    assert.deepStrictEqual(listHelper.mostLikes(list), { author: "bar", likes: 14 })
  })
});
