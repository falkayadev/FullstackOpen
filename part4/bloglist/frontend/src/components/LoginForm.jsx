import { useState } from 'react'

const LoginForm = ({ login }) => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  })

  const handleLogin = (event) => {
    event.preventDefault()
    login(inputs)
    setInputs({ username: '', password: '' })
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
          type="text"
          name="username"
          value={inputs.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
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
