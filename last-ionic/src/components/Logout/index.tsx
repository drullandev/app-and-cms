import React, { useEffect, useContext } from 'react'
import { IonRouterContext } from '@ionic/react'

import { RouteComponentProps, withRouter } from 'react-router';
import useStore from '../../stores/user.store';

const Logout: React.FC<any> = ({
  setData
}) => {
  const ionRouterContext = useContext(IonRouterContext)
  useEffect(() => {
    ionRouterContext.push('/tabs/schedule')
  }, [setData, ionRouterContext])
  return null
}

export default Logout;