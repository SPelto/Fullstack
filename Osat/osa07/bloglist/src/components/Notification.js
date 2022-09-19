import { useSelector } from 'react-redux'


const Notification = () => {
  const notification = useSelector(state => state.notification)
  const errorConditions = ['error', 'wrong', 'incorrect', 'failed']
  let messageType = null

  if (notification === null) {
    return null
  } else {
    messageType = errorConditions.some(condition => notification.includes(condition)) ? 'error' : 'success'
  }


  return (
    <div className={messageType}>
      {notification}
    </div>
  )
}

export default Notification