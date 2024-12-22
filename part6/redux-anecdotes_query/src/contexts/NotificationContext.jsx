/* eslint-disable react/prop-types */
import { createContext, useReducer, useRef } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  )
  const timeoutRef = useRef(null)
  const setNotification = (message, timeout = 5000) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    notificationDispatch({ type: 'SET', payload: message })
    timeoutRef.current = setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
      timeoutRef.current = null
    }, timeout)
  }
  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
