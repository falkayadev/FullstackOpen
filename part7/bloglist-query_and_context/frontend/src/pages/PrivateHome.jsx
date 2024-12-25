import Header from '../components/Header'
import Togglable from '../components/Togglable'
import CreateForm from '../components/CreateForm'
import BlogList from '../components/BlogList'
import useBlogs from '../hooks/useBlogs'
import useUser from '../hooks/useUser'
import useNotify from '../hooks/useNotify'
import { useUserDispatch } from '../contexts/UserContext'
import { useRef } from 'react'
const PrivateHome = () => {
  const { user } = useUser()
  const { blogs } = useBlogs(user)
  const userDispatch = useUserDispatch()
  const { notify } = useNotify()
  const createFormRef = useRef()
  const handleLogout = () => {
    localStorage.removeItem('user')
    userDispatch({ type: 'CLEAR_USER', payload: null })
    notify('success', 'Logout successful', 5000)
  }
  return (
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
}

export default PrivateHome
