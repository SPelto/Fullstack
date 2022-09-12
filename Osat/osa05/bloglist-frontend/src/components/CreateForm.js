import { useState, useRef } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const CreateForm = ({
  setMessage,
  blogs,
  setBlogs
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = useRef()

  const messageUpdate = (message, setMessage) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }
  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = {
        title: title,
        author: author,
        url: url
      }
      const response = await blogService.create(newBlog)
      blogFormRef.current.toggleVisibility()
      const updatedBlogs = blogs.concat(response.data)
      setBlogs(updatedBlogs)
      messageUpdate(`a new blog ${newBlog.title}`, setMessage)
    } catch (exception) {
      console.log(exception)
      messageUpdate('creation of blog failed', setMessage)
    }
  }

  return (
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <h2>create new</h2>
        <form onSubmit={handleCreateBlog}>
          <div>
            title
            <input
              id='title'
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div>
            author
            <input
              id='author'
              value={author}
              onChange={handleAuthorChange}
            />
          </div>
          <div>
            url
            <input
              id='url'
              value={url}
              onChange={handleUrlChange}
            />
          </div>
          <button id='create-button' type="submit">create</button>
        </form>
      </Togglable>
    </div>
  )
}

export default CreateForm