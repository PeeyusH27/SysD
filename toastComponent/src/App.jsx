import React from 'react'
import useNotification from './hook/use-notification'

const App = () => {
  //Custom hook for Toast - useNotification(position)
  const {NotificationComp, triggerNotification} = useNotification('bottom-left')
  return (
    <div>
      {/* <Notification type='success' message={'This is the way!!'}/> */}
      <button onClick={() => triggerNotification({
        type:'success',
        message: 'File Sent Successfully',
        duration: '3000'
      })}>Trigger Success</button>

      <button onClick={() => triggerNotification({
        type:'error',
        message: 'An Error Occured',
        duration: '3000'
      })}>Trigger Error</button>
      {NotificationComp}
    </div>
  )
}

export default App