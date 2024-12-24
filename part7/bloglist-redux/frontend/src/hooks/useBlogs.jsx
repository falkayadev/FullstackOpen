import { useEffect } from 'react'
import blogService from '../services/blogService'
import useNotify from '../hooks/useNotify'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from '../reducers/blogReducer'

const useBlogs = (user, setUser, handleLogout) => {
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()
  const { notify } = useNotify()

  useEffect(() => {
    const fetchBlogs = async () => {
      if (user) {
        try {
          const fetchedBlogs = await blogService.getAll()
          dispatch(setBlogs(fetchedBlogs))
        } catch (error) {
          if (error.status === 401) {
            localStorage.removeItem('user')
            dispatch(setUser(null))
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

  return { blogs }
}

export default useBlogs
