import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import CreateForm from './components/CreateForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const messageUpdate = (message, setMessage) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON).data || JSON.parse(loggedUserJSON) // Cypress assigns without "data" so conditional variable assignment is needed
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.data.token)
      console.log(user.data)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      messageUpdate('wrong credentials', setMessage)
    }
  }

  const loggedIn = () => {
    return (
      <div>
        <Notification message={message} />
        <Logout setUser={setUser} />
        <CreateForm setMessage={setMessage} 
        blogs={blogs}
        setBlogs={setBlogs}/>
        <h2>blogs</h2>
        <Blogs blogs={blogs} 
        setBlogs={setBlogs}/>
      </div>
    )
  }

  const notLoggedIn = () => {
    return (
      <div>
        <Notification message={message} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      {user === null ?
        notLoggedIn()
        :
        <div>
          <p>{user.username} logged in</p>
          {loggedIn()}
        </div>
      }
    </div>
  )
}

export default App
