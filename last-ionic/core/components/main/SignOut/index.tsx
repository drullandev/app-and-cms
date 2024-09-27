import React, { useEffect, useContext } from 'react'
import { IonRouterContext } from '@ionic/react'

const SignOut: React.FC<any> = ({
  setData
}) => {
  const ionRouterContext = useContext(IonRouterContext)
  useEffect(() => {
    ionRouterContext.push('/login')
  }, [setData, ionRouterContext])
  return null
}

export default React.memo(SignOut);