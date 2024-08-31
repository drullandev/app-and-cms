import { HOME_PATH, LOGIN_PATH } from '../../app/config/env'

import React from 'react'
import { Redirect } from 'react-router'
import '../../styles/index.scss'

const Home: React.FC<any> = ({ hasSeenTutorial }) => (
  hasSeenTutorial 
    ? <Redirect to={HOME_PATH} />
    : <Redirect to={LOGIN_PATH} />
)

export default Home;