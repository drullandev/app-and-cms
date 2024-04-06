import React from 'react'
import { IonContent, IonGrid, IonRow, IonCol } from '@ionic/react'

import MatesItem from './MatesItem'

import { Speaker } from '../../models/Speaker'
import { Session } from '../../models/Schedule'

import { connect } from '../../data/connect'
import * as selectors from '../../data/selectors'

interface OwnProps { }

interface StateProps {
  speakers: Speaker[]
  speakerSessions: { [key: string]: Session[] }
}

interface DispatchProps { }

interface SpeakerListProps extends OwnProps, StateProps, DispatchProps { }

const SpeakerList: React.FC<SpeakerListProps> = ({ speakers, speakerSessions }) => {

  return <IonContent>

    <IonGrid fixed>
      <IonRow>
        {speakers.map(speaker => (
          <IonCol size='12' size-md='6' key={speaker.id}>
            <MatesItem
              key={speaker.id}
              speaker={speaker}
              sessions={speakerSessions[speaker.name]}
            />
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>

  </IonContent>

}

export default connect<OwnProps, StateProps, DispatchProps>({

  mapStateToProps: (state) => ({
    speakers: selectors.getSpeakers(state),
    speakerSessions: selectors.getSpeakerSessions(state)
  }),
  
  component: React.memo(SpeakerList)

})