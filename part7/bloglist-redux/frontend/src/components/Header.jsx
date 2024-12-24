import Notification from './Notification'
import { useSelector } from 'react-redux'

const Header = ({ title }) => {
  const notification = useSelector((state) => state.notification)
  return (
    <>
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      <h2>{title}</h2>
    </>
  )
}

export default Header
