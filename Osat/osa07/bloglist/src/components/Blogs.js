import Blog from './Blog'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
const Blogs = ({ }) => {
  const sortedBlogs = [...useSelector(state => state.blog)].sort((a, b) => b.votes - a.votes)

  return (
    <div>
      {sortedBlogs.map(blog =>
        <Blog blog={blog} blogs={sortedBlogs} key={blog.id} />
      )}
    </div>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired
}

export default Blogs