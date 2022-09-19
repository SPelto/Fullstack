import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      return state.map(blog => blog.id === action.payload.id ? blog = action.payload : blog)
    },
    remove(state, action) {
      console.log(action.payload)
      return state
    },
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    }
  }
})

export const { updateBlog, setBlogs, appendBlog, remove } = blogSlice.actions

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.addBlog(content)
    dispatch(appendBlog(newBlog))
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    const response = await blogService.remove(blog)
    dispatch(remove(blog))
  }
}
export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const increaseLikes = (blog) => {
  return async dispatch => {
    await blogService.updateLikes(blog)
    dispatch(updateBlog(blog))
  }
}

export default blogSlice.reducer