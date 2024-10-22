import React, { useEffect, useContext } from 'react'
import { IonRouterContext } from '@ionic/react'

const SignOut: React.FC<any> = ({
  setUserStore
}) => {
  const ionRouterContext = useContext(IonRouterContext)
  useEffect(() => {
    ionRouterContext.push('/login')
  }, [setUserStore, ionRouterContext])
  return null
}

export default React.memo(SignOut);