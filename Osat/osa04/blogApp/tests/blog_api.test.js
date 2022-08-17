const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)
const bcrypt = require('bcrypt')



beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()

  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[2])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[3])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are four blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(4)
})

test('blogs can be added to database', async () => {
  const newBlog = {
    "title": "Added blog",
    "author": "Unnamed author",
    "url": "http://www.testsdonthaveurls.com",
    "likes": "609"
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(blog => blog.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(contents).toContain('Added blog')
})

test('Incorrect data is not accepted to blog database', async () => {
  const newBlog = {
    "author": "Unnamed author",
    "likes": "5"
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('blogs use initial value=0 for likes', async () => {
  const newBlog = {
    "title": 'Added blog',
    "author": 'Unnamed author',
    "url": "http://www.testsdonthaveurls.com",
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body
    .filter(blog =>
      blog.title == 'Added blog')
    .map(blog =>
      blog.likes)

  expect(contents).toContain(0)
})

test('blogs can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
    )
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
})

test('blogs can be modified', async () => {

  const newLikeAmount = 609
  const blogsAtStart = await helper.blogsInDb()
  const blogToModify = blogsAtStart[0]
  const updatedBlog = {... blogToModify, likes: newLikeAmount}

  await api
    .put(`/api/blogs/${blogToModify.id}`)
    .send(updatedBlog)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length
    )
    const newLikes = blogsAtEnd
    .filter(blog => blog.id === blogToModify.id)
    .map(blog => blog.likes)
    expect(200)
    expect(newLikes).toContain(newLikeAmount)
})

afterAll(() => {
  mongoose.connection.close()
})