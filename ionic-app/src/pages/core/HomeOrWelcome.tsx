import * as AppConst from '../../data/static/constants'

import React from 'react'
import { Redirect } from 'react-router'
import '../../pages/Styles.scss'

import { connect } from '../../data/connect'

interface StateProps {
  hasSeenTutorial: boolean
}

const HomeOrWelcome: React.FC<StateProps> = ({ hasSeenTutorial }) => (
  hasSeenTutorial
    ? <Redirect to={AppConst.HOME} />
    : <Redirect to={AppConst.LOGIN} />
)


export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    hasSeenTutorial: state.user.hasSeenTutorial
  }),
  component: HomeOrWelcome
})