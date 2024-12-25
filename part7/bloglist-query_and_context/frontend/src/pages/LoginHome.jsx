import Header from '../components/Header'
import Togglable from '../components/Togglable'
import LoginForm from '../components/LoginForm'
import { useRef } from 'react'
const LoginHome = () => {
  const loginFormRef = useRef()
  return (
    <>
      <Header title="Log in to application" />
      <Togglable buttonLabel="login" ref={loginFormRef}>
        <LoginForm />
      </Togglable>
    </>
  )
}

export default LoginHome
