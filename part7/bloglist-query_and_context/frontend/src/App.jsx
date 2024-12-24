import { useRef } from 'react'
import CreateForm from './components/CreateForm'
import blogService from './services/blogService'
import loginService from './services/loginService'
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import BlogList from './components/BlogList'
import useUser from './hooks/useUser'
import useBlogs from './hooks/useBlogs'
import Togglable from './components/Togglable'
import { useNotificationDispatch } from './contexts/NotificationContext'
import useNotify from './hooks/useNotify'

const App = () => {
  const [user, setUser] = useUser()
  const { notify } = useNotify()
  const dispatch = useNotificationDispatch()

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  const { blogs } = useBlogs()

  // handle actions
  const login = async (inputs) => {
    try {
      const user = await loginService.login(inputs)
      loginFormRef.current.toggleVisibility()
      notify('success', 'Login successful', 5000)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
    } catch (error) {
      if (error.status === 500) {
        dispatch({
          type: 'SET_NOTIFICATION',
          payload: { type: 'error', message: 'Server error' },
        })
      } else if (error.status === 401) {
        dispatch({
          type: 'SET_NOTIFICATION',
          payload: {
            type: 'error',
            message: 'Invalid username or password',
          },
        })
      }
      console.log(error)
    }
  }

  const loginFormRef = useRef()
  const createFormRef = useRef()
  const renderLogin = () => (
    <>
      <Header title="Log in to application" />
      <Togglable buttonLabel="login" ref={loginFormRef}>
        <LoginForm login={login} />
      </Togglable>
    </>
  )

  const renderMainApp = () => (
    <>
      <Header title="Blogs" />
      <Togglable buttonLabel="user settings">
        <p>{user.username} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </Togglable>
      <Togglable buttonLabel="create a new blog" ref={createFormRef}>
        <CreateForm />
      </Togglable>
      <BlogList blogs={blogs} user={user} />
    </>
  )

  return user === null ? renderLogin() : renderMainApp()
}

export default App
