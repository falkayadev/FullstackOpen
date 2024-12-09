export default Notification = ({ notification }) => {
  return <div className={notification.type}>{notification.message}</div>;
};
