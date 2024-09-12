// Required
import React, { useEffect, useState } from 'react'
import { IonToast} from '@ionic/react'

// Are you testing this tools set && app?
//let testingLogin = true
//let testing = testingLogin && import.meta.env.REACT_APP_TESTING
// - The main testing user will be used under testing

const Toast: React.FC<any> = (toastOptions: any) => {

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setShowToast(true)
  },[])

  return <IonToast
    isOpen={showToast}
    onDidDismiss={() => setShowToast(false)}
    message={toastOptions.message}
    duration={1500}
  />
  
}

export default Toast