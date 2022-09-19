import { useState } from 'react'
import { removeBlog, increaseLikes } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
const Blog = ({ blog }) => {
  const [currBlog, setcurrBlog] = useState(blog)
  const [details, setDetails] = useState(false)
  const dispatch = useDispatch()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    try {
      const updatedBlog = { ...currBlog, likes: currBlog.likes + 1 }
      dispatch(increaseLikes(updatedBlog))
      setcurrBlog(updatedBlog)
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleRemove = async () => {
    if (window.confirm("Do you want to remove the blog?")) {
      try {
        dispatch(removeBlog(currBlog))
        setcurrBlog(null)
      } catch (exception) {
        console.log(exception)
      }
    }
  }

  if (currBlog) {
    if (!details) {
      return (
        <div className='blog'>
          {currBlog.title} {currBlog.author} <button onClick={() => setDetails(true)}>View</button>
        </div>
      )

    } else {
      return (
        <div style={blogStyle} className='blog'>
          {currBlog.title} {currBlog.author} <button onClick={() => setDetails(false)} >Hide</button>
          <br /> {currBlog.url}
          <br /> likes: {currBlog.likes} <button onClick={handleLike}> like</button>
          <br /> {currBlog.user.username}
          <br /> <button onClick={handleRemove}> remove </button>
        </div>
      )
    }
  }
}


export default Blog