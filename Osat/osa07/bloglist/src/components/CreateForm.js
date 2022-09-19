import { useState, useRef } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import { updateNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const CreateForm = ({
  blogs,
  setBlogs
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const blogFormRef = useRef()

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
      dispatch(updateNotification(`Blog ${newBlog.title} created`, 5000))

    } catch (exception) {
      console.log(exception)
      dispatch(updateNotification('Blog creation failed', 5000))

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