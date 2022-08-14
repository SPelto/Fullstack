const blog = require("../models/blog")

const dummy = (blogs) => {
  return (
    1
  )
}

const totalLikes = (blogs) => (
  blogs.reduce((sum, blog) => (
    sum + blog.likes)
    , 0)
)

const favoriteBlog = (blogs) => {
  const blog = blogs.reduce((prev, current) => (
    prev.likes > current.likes ? prev : current
  ))
  return (
    {
      title: blog.title,
      author: blog.author,
      likes: blog.likes
    })
}

const mostLikedBlog = (blogs) => {
  const blog = blogs.reduce((prev, current) => (
    prev.likes > current.likes ? prev : current
  ))
  return (
    {
      author: blog.author,
      likes: blog.likes
    })
}

const mostBlogs = (blogs) => {
  const authorBlogs = blogs.map(blog => blog.author).sort()
  const authorCounts = authorBlogs.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
  const l = Array.from(authorCounts.entries())
  const author = l.reduce((prev, current) => (
    prev[1] > current[1] ? prev : current
  ))
  return (
    {
      author: author[0],
      blogs: author[1]
    }
  )
}
const mostLikedAuthor = (blogs) => {
  uniqueAuthors = [...new Set(blogs.map(blog => blog.author))];
  authorLikes = new Array()
  uniqueAuthors.forEach(author => {
    obj = { author: author, likes: 0 }
    authorLikes.push(obj)
  })
  blogs.map(blog => (
    authorLikes.forEach(entry => {
      if (entry.author === blog.author) {
        entry.likes += blog.likes
      }
    })
  ))
  const mostLiked = authorLikes.reduce((prev, current) => (
    prev.likes > current.likes ? prev : current
  ))
  return (mostLiked)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikedBlog,
  mostBlogs,
  mostLikedAuthor
}