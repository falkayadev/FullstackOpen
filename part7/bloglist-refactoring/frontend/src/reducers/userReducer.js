const reducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT',
  }
}

export const setUser = (userObj) => {
  return {
    type: 'LOGIN',
    payload: userObj,
  }
}
export default reducer
