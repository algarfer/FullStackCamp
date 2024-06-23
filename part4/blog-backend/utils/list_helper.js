const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs
  .reduce((acc, curr) => acc + curr.likes, 0)

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  return blogs
    .reduce((acc, curr) => acc.likes > curr.likes ? acc : curr)
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0) return null

  const authors = blogs.reduce((acc, curr) => {
    if (acc[curr.author]) acc[curr.author]++
    else acc[curr.author] = 1
    return acc
  }, {})
  const max = Math.max(...Object.values(authors))
  const author = Object
    .entries(authors)
    .find(([author, blogs]) => blogs === max)
  return { author: author[0], blogs: author[1] }
}

const mostLikes = (blogs) => {
  if(blogs.length === 0) return null

  const authors = blogs
    .map(blog => ({ author: blog.author, likes: blog.likes }))
  const maxLikes = Math.max(...authors.map(author => author.likes))
  const { author } = authors
    .find(author => author.likes === maxLikes)
  const likes = authors
    .filter(a => a.author === author)
    .reduce((acc, curr) => acc + curr.likes, 0)

  return { author, likes }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
