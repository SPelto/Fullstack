const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    "title": "How to Mongo",
    "author": "Maarto Pellas",
    "url": "www.url.com",
    "likes": "3"
  },
  {
    "title": "React patterns",
    "author": "Michael Chan",
    "url": "https://reactpatterns.com/",
    "likes": "7"
  },
  {
    "title": "Go To Statement Considered Harmful",
    "author": "Edsger W. Dijkstra",
    "url": "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    "likes": "5"
  },
  {
    "title": "Type wars",
    "author": "Robert C. Martin",
    "url": "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    "likes": "2"
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[3])
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
    "likes": "5"
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const contents = response.body.map(blog => blog.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
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

afterAll(() => {
  mongoose.connection.close()
})