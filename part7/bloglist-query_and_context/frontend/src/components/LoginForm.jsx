import { useState } from 'react'
import loginService from '../services/loginService'
import useNotify from '../hooks/useNotify'
import { useUserDispatch } from '../contexts/UserContext'
import { useNotificationDispatch } from '../contexts/NotificationContext'

const LoginForm = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  })
  const { notify } = useNotify()
  const userDispatch = useUserDispatch()
  const notificationDispatch = useNotificationDispatch()

  // handle actions
  const login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(inputs)
      notify('success', 'Login successful', 5000)
      window.localStorage.setItem('user', JSON.stringify(user))
      userDispatch({ type: 'SET_USER', payload: user })
      setInputs({ username: '', password: '' })
    } catch (error) {
      if (error.status === 500) {
        notificationDispatch({
          type: 'SET_NOTIFICATION',
          payload: { type: 'error', message: 'Server error' },
        })
      } else if (error.status === 401) {
        notificationDispatch({
          type: 'SET_NOTIFICATION',
          payload: {
            type: 'error',
            message: 'Invalid username or password',
          },
        })
      }
    }
  }

  // handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }))
  }
  return (
    <form onSubmit={login}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          data-testid="username"
          type="text"
          name="username"
          value={inputs.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          data-testid="password"
          type="password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
        />
      </div>
      <button>login</button>
    </form>
  )
}

export default LoginForm
