const Notification = ({ message }) => {
  const errorConditions = ['error', 'wrong', 'incorrect', 'failed']
  let messageType = null
  
  if (message === null) {
    return null
  } else {
    messageType = errorConditions.some(condition => message.includes(condition)) ? 'error' : 'success'
  }


  return (
    <div className={messageType}>
      {message}
    </div>
  )
}

export default Notification