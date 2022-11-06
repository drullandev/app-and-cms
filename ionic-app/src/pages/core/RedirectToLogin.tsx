import React, { useEffect, useContext } from 'react'
import { IonRouterContext } from '@ionic/react'

import * as AppConst from '../../data/static/constants'

interface RedirectToLoginProps {
  setisLoggedIn:  Function
  setNickname:    Function
  setDarkMode: Function
}

const RedirectToLogin: React.FC<RedirectToLoginProps> = ({ setisLoggedIn, setNickname, setDarkMode }) => {

  const ionRouterContext = useContext(IonRouterContext)

  useEffect(() => {
    setisLoggedIn(false)
    setNickname(undefined)
    setDarkMode(true)
    ionRouterContext.push(AppConst.HOME)
  }, [setisLoggedIn, setNickname, setDarkMode, ionRouterContext])

  return null

}

export default RedirectToLogin