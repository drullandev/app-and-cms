import React, { useEffect, useContext } from 'react'
import { IonRouterContext } from '@ionic/react'

import * as AppConst from '../../static/constants'

interface RedirectToLoginProps {
  setIsLoggedIn:  Function
  setNickname:    Function
  setDarkMode: Function
}

const RedirectToLogin: React.FC<RedirectToLoginProps> = ({ setIsLoggedIn, setNickname, setDarkMode }) => {

  const ionRouterContext = useContext(IonRouterContext)

  useEffect(() => {
    setIsLoggedIn(false)
    setNickname(undefined)
    setDarkMode(true)
    ionRouterContext.push(AppConst.HOME)
  }, [setIsLoggedIn, setNickname, setDarkMode, ionRouterContext])

  return null

}

export default RedirectToLogin