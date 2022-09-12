import Blog from './Blog'
import PropTypes from 'prop-types'

const Blogs = ({ blogs }) => {
  const sortedBlogs = blogs.sort((a,b) => (a.likes < b.likes) ? 1 : -1)
  return (
    <div>
      {sortedBlogs.map(blog =>
        <Blog blog={blog} key={blog.id} />
      )}
    </div>
  )
}

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired
}

export default Blogs