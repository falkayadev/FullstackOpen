import Notification from './Notification'
import { useNotificationValue } from '../contexts/NotificationContext'

const Header = ({ title }) => {
  const notification = useNotificationValue()
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
