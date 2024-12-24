import { useRef } from 'react'
import CreateForm from './components/CreateForm'
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import BlogList from './components/BlogList'
import useBlogs from './hooks/useBlogs'
import Togglable from './components/Togglable'
import useNotify from './hooks/useNotify'
import { useUserDispatch, useUserValue } from './contexts/UserContext'
import useUser from './hooks/useUser'

const App = () => {
  const { user } = useUser()
  const { notify } = useNotify()
  const userDispatch = useUserDispatch()

  const handleLogout = () => {
    localStorage.removeItem('user')
    userDispatch({ type: 'CLEAR_USER', payload: null })
    notify('success', 'Logout successful', 5000)
  }

  const { blogs } = useBlogs(user)

  const loginFormRef = useRef()
  const createFormRef = useRef()
  const renderLogin = () => (
    <>
      <Header title="Log in to application" />
      <Togglable buttonLabel="login" ref={loginFormRef}>
        <LoginForm />
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
