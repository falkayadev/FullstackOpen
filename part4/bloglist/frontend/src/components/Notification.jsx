const Notification = ({ type, message }) => {
  if (message === null) return null;
  return <div className={type}>{message}</div>;
};

export default Notification;
