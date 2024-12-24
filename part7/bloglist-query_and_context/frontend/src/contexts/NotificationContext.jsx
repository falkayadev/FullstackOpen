import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

const initialState = null

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState
  )
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error(
      'useNotificationValue must be used within a NotificationContextProvider'
    )
  }
  return context[0]
}

export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error(
      'useNotificationDispatch must be used within a NotificationContextProvider'
    )
  }
  return context[1]
}

export default NotificationContext
