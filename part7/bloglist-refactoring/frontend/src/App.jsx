import { useRef } from 'react'
// compontents
import CreateForm from './components/CreateForm'
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'
// hooks
import useUser from './hooks/useUser'
// services and reducers
import { logout } from './reducers/userReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const { user } = useUser()
  const dispatch = useDispatch()

  const handleLogout = () => {
    localStorage.removeItem('user')
    dispatch(logout())
  }

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
    <div>
      <Header title="Blogs" />
      <Togglable buttonLabel="user settings">
        <p>{user.username} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </Togglable>
      <Togglable buttonLabel="create a new blog" ref={createFormRef}>
        <CreateForm user={user} />
      </Togglable>
      <BlogList user={user} />
    </div>
  )

  return user === null ? renderLogin() : renderMainApp()
}

export default App
