import { HOME_PATH, LOGIN_PATH } from '../../../env'

import React from 'react'
import { Redirect } from 'react-router'
import '../../../styles/index.scss'

import { connect } from '../../../reducer/src/connect'

interface StateProps {
  hasSeenTutorial: boolean
}

const HomeOrWelcome: React.FC<StateProps> = ({ hasSeenTutorial }) => (
  hasSeenTutorial ? <Redirect to={HOME_PATH} /> : <Redirect to={LOGIN_PATH} />
)

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    hasSeenTutorial: state.user.hasSeenTutorial
  }),
  component: HomeOrWelcome
})