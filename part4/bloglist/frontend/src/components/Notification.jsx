const Notification = ({ type, message }) => {
  if (message === null) return null
  return (
    <div
      className={type}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <p>{message}</p>
    </div>
  )
}

export default Notification
