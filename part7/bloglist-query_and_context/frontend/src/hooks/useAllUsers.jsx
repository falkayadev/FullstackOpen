import userService from '../services/userService'
import useNotify from './useNotify'
import { useQuery } from '@tanstack/react-query'

const useAllUsers = (user) => {
  const { notify } = useNotify()
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    enabled: !!user,
  })

  if (isLoading) {
    return { users: [], loading: true }
  }

  if (error) {
    notify('error', 'Error fetching blogs!', 5000)
    return { users: [], error: true }
  }

  return { users }
}

export default useAllUsers
