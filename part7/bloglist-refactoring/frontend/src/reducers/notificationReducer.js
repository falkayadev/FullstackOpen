const reducer = (state = { type: null, message: null }, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return action.payload
    case 'CLEAR_ERROR':
      return { type: null, message: null }
    default:
      return state
  }
}

export const setError = (message) => {
  return { type: 'SET_ERROR', payload: message }
}

export const clearError = () => {
  return { type: 'CLEAR_ERROR' }
}

export default reducer
