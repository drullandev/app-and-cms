import React from 'react'
import { Redirect } from 'react-router'

const Home: React.FC<any> = ({ hasSeenTutorial }) => (
  hasSeenTutorial 
    ? <Redirect to={import.meta.env.VITE_HOME_PATH} />
    : <Redirect to={import.meta.env.VITE_AUTH_LOGIN} />
)

export default Home;