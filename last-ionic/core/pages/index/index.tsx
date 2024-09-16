import React from 'react'
import { Redirect } from 'react-router'


const Home: React.FC<any> = ({ hasSeenTutorial }) => (
  hasSeenTutorial 
    ? <Redirect to={process.env.REACT_APP_HOME_PATH} />
    : <Redirect to={process.env.REACT_APP_AUTH_LOGIN} />
)

export default Home;