import Header from '../components/Header'
import useUser from '../hooks/useUser'
import useNotify from '../hooks/useNotify'
import useAllUsers from '../hooks/useAllUsers'
import { useUserDispatch } from '../contexts/UserContext'

const Users = () => {
  const { user } = useUser()
  const { users } = useAllUsers(user)
  const userDispatch = useUserDispatch()
  const { notify } = useNotify()
  const handleLogout = () => {
    localStorage.removeItem('user')
    userDispatch({ type: 'CLEAR_USER', payload: null })
    notify('success', 'Logout successful', 5000)
  }
  if (!user) {
    return null
  }
  return (
    <div>
      <Header title="blogs" />
      <p>{user.username} logged in</p>
      <button onClick={handleLogout}>logout</button>
      <Header title="Users" />
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
