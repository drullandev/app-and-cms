import { HOME, LOGIN } from '../../../env'

import React from 'react'
import { Redirect } from 'react-router'
import '../../../styles/index.scss'

import { connect } from '../../../data/connect'

interface StateProps {
  hasSeenTutorial: boolean
}

const HomeOrWelcome: React.FC<StateProps> = ({ hasSeenTutorial }) => (
  hasSeenTutorial
    ? <Redirect to={HOME} />
    : <Redirect to={LOGIN} />
)

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    hasSeenTutorial: state.user.hasSeenTutorial
  }),
  component: HomeOrWelcome
})