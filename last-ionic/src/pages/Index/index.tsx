import React from 'react'
import { Redirect } from 'react-router'
import { authLoginPath, homePath } from '../../app/config/env';

const Home: React.FC<any> = ({ hasSeenTutorial }) => (
  hasSeenTutorial 
    ? <Redirect to={homePath?.path??'/home'} />
    : <Redirect to={authLoginPath} />
)

export default Home;