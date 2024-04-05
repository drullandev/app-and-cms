import React from 'react'
import { connect } from '../data/connect'
import { Redirect } from 'react-router'

interface StateProps {
  hasSeenTutorial: boolean
}

const HomeOrTutorial: React.FC<StateProps> = ({
  hasSeenTutorial = false
}) => {
  let home = import.meta.env.REACT_APP_HOME_PATH
  let tutorial = '/tutorial'
  return hasSeenTutorial ? <Redirect to={`${home}`} /> : <Redirect to={`${tutorial}`} />
}

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    hasSeenTutorial: state.user.hasSeenTutorial
  }),
  component: HomeOrTutorial
})