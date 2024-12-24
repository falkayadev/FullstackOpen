import { useState, useEffect } from 'react'
import blogService from '../services/blogService'
import useNotify from './useNotify'
const useBlogs = (user, changeUser, handleLogout) => {
  const [blogs, setBlogs] = useState([])
  const { notify } = useNotify()

  useEffect(() => {
    const fetchBlogs = async () => {
      if (user) {
        try {
          const blogs = await blogService.getAll()
          setBlogs(blogs)
        } catch (error) {
          if (error.status === 401) {
            localStorage.removeItem('user')
            changeUser(null)
            notify('error', 'Your login has expired or is invalid', 5000)
            handleLogout()
          } else {
            console.error('Failed to fetch blogs:', error)
          }
        }
      }
    }

    fetchBlogs()
  }, [user])

  return [blogs, setBlogs]
}

export default useBlogs
