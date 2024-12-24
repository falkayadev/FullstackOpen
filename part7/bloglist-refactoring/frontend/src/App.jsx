import { useState, useRef } from 'react'
import CreateForm from './components/CreateForm'
import blogService from './services/blogService'
import loginService from './services/loginService'
import LoginForm from './components/LoginForm'
import Header from './components/Header'
import BlogList from './components/BlogList'
import useUser from './hooks/useUser'
import useBlogs from './hooks/useBlogs'
import Togglable from './components/Togglable'
import { setError } from './reducers/notificationReducer'
import useNotify from './hooks/useNotify'

const App = () => {
  const [user, setUser] = useUser()
  const { notify } = useNotify()

  const handleLogout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  const [blogs, setBlogs] = useBlogs(user, setUser, handleLogout)

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
        setError('Server error')
      } else if (error.status === 401) {
        setError('Invalid username or password')
      }
      console.log(error)
    }
  }

  const createBlog = async (noteObject) => {
    try {
      const newBlog = await blogService.create(noteObject)
      console.log(newBlog)
      createFormRef.current.toggleVisibility()
      notify(
        'success',
        `${user.name} created a new blog titled ${newBlog.title}`,
        5000
      )
      setBlogs((prevBlogs) => prevBlogs.concat(newBlog))
    } catch (error) {
      notify('error', 'Blog creation failed!', 5000)
    }
  }

  const updateBlog = async (id, reqObj) => {
    try {
      const updatedBlog = await blogService.update(id, reqObj)
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) => (blog.id === id ? updatedBlog : blog))
      )
    } catch (error) {
      notify('error', 'Blog update failed!', 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id))
    } catch (error) {
      notify('error', 'Blog deletion failed!', 5000)
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
    <div>
      <Header title="Blogs" />
      <Togglable buttonLabel="user settings">
        <p>{user.username} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </Togglable>
      <Togglable buttonLabel="create a new blog" ref={createFormRef}>
        <CreateForm createBlog={createBlog} />
      </Togglable>
      <BlogList
        blogs={blogs}
        user={user}
        updateBlog={updateBlog}
        deleteBlog={deleteBlog}
      />
    </div>
  )

  return user === null ? renderLogin() : renderMainApp()
}

export default App
