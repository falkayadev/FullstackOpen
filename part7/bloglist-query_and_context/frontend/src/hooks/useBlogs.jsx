import blogService from '../services/blogService'
import useNotify from './useNotify'
import { useQuery } from '@tanstack/react-query'

const useBlogs = (user) => {
  const { notify } = useNotify()
  const {
    data: blogs,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    enabled: !!user,
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
