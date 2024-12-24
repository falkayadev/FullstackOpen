import { useState } from 'react'
import loginService from '../services/loginService'
import useNotify from '../hooks/useNotify'
import { setUser } from '../reducers/userReducer.js'
import { setError } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const LoginForm = ({ login }) => {
  const { notify } = useNotify()
  const dispatch = useDispatch()
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  })

  // handle actions
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(inputs)
      console.log(user)
      notify('success', 'Login successful', 5000)
      window.localStorage.setItem('user', JSON.stringify(user))
      dispatch(setUser(user))
      console.log('setuser calisti')
    } catch (error) {
      if (error.status === 500) {
        setError('Server error')
      } else if (error.status === 401) {
        setError('Invalid username or password')
      }
      console.log(error)
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
    <form onSubmit={handleLogin}>
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
