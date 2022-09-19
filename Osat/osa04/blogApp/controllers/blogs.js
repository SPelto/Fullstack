const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const testToken = async (token) => {
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  } else {
    const user = await User.findById(decodedToken.id)
    return user
  }
}
blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1 })
    response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})
blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {

  try {
    const user = await testToken(request.token)
    const blog = new Blog(request.body)

    const blogWithUser = new Blog({
      title: blog.title,
      author: blog.author,
      likes: blog.likes,
      url: blog.url,
      user: user._id
    })

    const savedBlog = await blogWithUser.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const newLikes = request.body.likes
  try {
    const updated = await Blog.findByIdAndUpdate(request.params.id, { likes: newLikes })
    response.status(200).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    const user = await testToken(request.token)
    if (!(user.id === blog.user.toString())) {
      response.status(401).json({ error: 'Blog can only be extinguished if thou has created it' }).end()
    } else {
      await Blog.deleteOne({ _id: request.params.id })
      response.status(204).end()
    }
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter