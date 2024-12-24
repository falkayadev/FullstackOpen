import { useNotificationDispatch } from '../contexts/NotificationContext'

const useNotify = () => {
  const dispatch = useNotificationDispatch()

  const notify = (type, message, timeout = 5000) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: { type, message } })

    // Store the timeout ID
    const timeoutId = setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION', payload: null })
    }, timeout)

    // Return a function to clear the timeout
    return () => clearTimeout(timeoutId)
  }

  return { notify }
}

export default useNotify
