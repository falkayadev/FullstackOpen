import { Routes, Route } from 'react-router'
import useUser from './hooks/useUser'
import LoginHome from './pages/LoginHome'
import PrivateHome from './pages/PrivateHome'
import Users from './pages/Users'

const App = () => {
  const { user } = useUser()
  return (
    <Routes>
      <Route index element={user === null ? <LoginHome /> : <PrivateHome />} />
      <Route path="users">
        <Route index element={<Users />} />
        <Route path=":id" element={<h1>Single user</h1>} />
      </Route>
    </Routes>
  )
}

export default App
