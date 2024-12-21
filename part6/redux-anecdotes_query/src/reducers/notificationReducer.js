import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', timeoutId: null },
  reducers: {
    setNotification(state, action) {
      return { ...state, message: action.payload }
    },
    setTimeoutId(state, action) {
      return { ...state, timeoutId: action.payload }
    },
    clearNotification() {
      return { message: '', timeoutId: null }
    },
  },
})

export const notify = (content, duration) => {
  return (dispatch, getState) => {
    const prevTimeoutId = getState().notification.timeoutId

    if (prevTimeoutId) clearTimeout(prevTimeoutId)

    dispatch(setNotification(content))

    const timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, duration * 1000)

    dispatch(setTimeoutId(timeoutId))
  }
}

export const { setNotification, clearNotification, setTimeoutId } =
  notificationSlice.actions
export default notificationSlice.reducer
