import { HOME_PATH, LOGIN_PATH } from '../../.env'

import React from 'react'
import { Redirect } from 'react-router'
import '../../styles/index.scss'
// Component Reducer
import { connect } from '../../reducer/src/connect'
import { OwnProps, ComponentProps, StateProps, DispatchProps, mapStateToProps, mapDispatchToProps } from './reducer'

const Home: React.FC<StateProps> = ({ hasSeenTutorial }) => (
  hasSeenTutorial 
    ? <Redirect to={HOME_PATH} />
    : <Redirect to={LOGIN_PATH} />
)

export default connect<OwnProps, StateProps, DispatchProps>({ mapStateToProps, mapDispatchToProps, component: Home });