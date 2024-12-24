import { useDispatch } from 'react-redux'
import { setError, clearError } from '../reducers/notificationReducer.js'

const useNotify = () => {
  const dispatch = useDispatch()

  const notify = (type, message, timeout = 5000) => {
    dispatch(setError({ type, message }))

    // Store the timeout ID
    const timeoutId = setTimeout(() => {
      dispatch(clearError())
    }, timeout)

    // Return a function to clear the timeout
    return () => clearTimeout(timeoutId)
  }

  return { notify }
}

export default useNotify
