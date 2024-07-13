import React from 'react'
import { connect } from '../redux/connect'
import { Redirect } from 'react-router'

interface StateProps {
  hasSeenTutorial: boolean
}

const HomeOrTutorial: React.FC<StateProps> = ({
  hasSeenTutorial = false
}) => {
  let home = import.meta.env.REACT_APP_HOME_PATH
  let tutorial = import.meta.env.REACT_APP_TUTORIAL_PATH
  return <Redirect to={hasSeenTutorial ? `${home}` : `${tutorial}`} />
}

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    hasSeenTutorial: state.user.hasSeenTutorial
  }),
  component: HomeOrTutorial
})