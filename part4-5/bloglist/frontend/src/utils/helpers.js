const notify = (type, message, timeout = 5000, errHandler) => {
  errHandler({ type, message })

  // Store the timeout ID
  const timeoutId = setTimeout(() => {
    errHandler(null)
  }, timeout)

  // Return a function to clear the timeout
  return () => clearTimeout(timeoutId)
}

export default { notify }
