import { useEffect } from 'react'
import { useUserDispatch } from '../contexts/UserContext'
import { useUserValue } from '../contexts/UserContext'

const useUser = () => {
  const dispatch = useUserDispatch()
  const user = useUserValue()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log(user)
      dispatch({ type: 'SET_USER', payload: user })
    }
  }, [dispatch])
  return { user }
}

export default useUser
