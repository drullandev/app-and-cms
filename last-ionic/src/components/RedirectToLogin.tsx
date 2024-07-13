import React, { useEffect, useContext } from 'react'
import { IonRouterContext } from '@ionic/react'
import { initialUser } from '../redux/state'

interface RedirectToLoginProps {
  setData: Function
}

const RedirectToLogin: React.FC<RedirectToLoginProps> = ({ setData }) => {
  const ionRouterContext = useContext(IonRouterContext)
  useEffect(() => {
    setData(initialUser)
    ionRouterContext.push('/tabs/schedule')
  }, [setData, ionRouterContext])
  return null
}

export default RedirectToLogin