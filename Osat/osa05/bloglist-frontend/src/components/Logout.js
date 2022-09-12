import PropTypes from 'prop-types'

const Logout = ( {setUser} ) => {
  const handleClick = () => {
    window.localStorage.removeItem('loggedBlogappUser') 
    setUser(null)
  }
  return (
    <button onClick={() => handleClick()}> logout </button>
  )
}

Logout.propTypes = {
  setUser: PropTypes.func.isRequired,
}

export default Logout