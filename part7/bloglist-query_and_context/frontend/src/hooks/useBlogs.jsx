import blogService from '../services/blogService'
import useNotify from './useNotify'
import { useQuery } from '@tanstack/react-query'
const useBlogs = () => {
  const { notify } = useNotify()
  const {
    data: blogs,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  })

  if (isLoading) {
    return { blogs: [], loading: true }
  }

  if (error) {
    notify('error', 'Error fetching blogs!', 5000)
    return { blogs: [], error: true }
  }

  return { blogs }
}

export default useBlogs
