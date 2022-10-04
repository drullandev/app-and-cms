import * as AppConst from '../../static/constants'
import React, { useState, useRef } from 'react'

import { IonToolbar, IonContent, IonButtons, IonTitle, IonMenuButton, IonSegment, IonSegmentButton, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig } from '@ionic/react'
import { options, search } from 'ionicons/icons'

import SessionList from '../../components/extra/SessionList'
import SessionListFilter from '../../components/extra/SessionListFilter'

import ShareSocialFab from '../../components/extra/ShareSocialFab'

import * as selectors from '../../data/selectors'
import { connect } from '../../data/connect'
import { setSearchString } from '../../data/sessions/sessions.actions'
import { Schedule } from '../../models/Schedule'

interface OwnProps { }

interface StateProps {
  schedule: Schedule
  favoritesHome: Home
  mode: 'ios' | 'md'
}

interface DispatchProps {
  setSearchString: typeof setSearchString
}

type HomeProps = OwnProps & StateProps & DispatchProps

const Home: React.FC<HomeProps> = ({ favoritesHome, schedule, setSearchString, mode }) => {

  const [segment, setSegment] = useState<'all' | 'favorites'>('all')
  const [showSearchbar, setShowSearchbar] = useState<boolean>(false)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null)
  const [showCompleteToast, setShowCompleteToast] = useState(false)

  const pageRef = useRef<HTMLElement>(null)

  const ios = mode === 'ios'

  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete()
      setShowCompleteToast(true)
    },  AppConst.timeout.redirect )
  }

  return <>

    <IonHeader translucent={true}>

      <IonToolbar>

        {!showSearchbar &&
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
        }

        {ios &&
          <IonSegment value={segment} onIonChange={(e) => setSegment(e.detail.value as any)}>
            <IonSegmentButton value='all'>
              All
            </IonSegmentButton>
            <IonSegmentButton value='favorites'>
              Favorites
            </IonSegmentButton>
          </IonSegment>
        }

        {/*!ios && !showSearchbar &&
          <IonTitle>Home</IonTitle>
        */}

        {showSearchbar &&
          <IonSearchbar showCancelButton='always' placeholder='Search' onIonChange={(e: CustomEvent) => setSearchString(e.detail.value)} onIonCancel={() => setShowSearchbar(false)}></IonSearchbar>
        }

        <IonButtons slot='end'>

          {!ios && !showSearchbar &&
            <IonButton onClick={() => setShowSearchbar(true)}>
              <IonIcon slot='icon-only' icon={search}></IonIcon>
            </IonButton>
          }

          {!showSearchbar &&
            <IonButton onClick={() => setShowFilterModal(true)}>
              {mode === 'ios' ? 'Filter' : <IonIcon icon={options} slot='icon-only' />}
            </IonButton>
          }

        </IonButtons>

      </IonToolbar>

      {!ios &&
        <IonToolbar>
          <IonSegment value={segment} onIonChange={(e) => setSegment(e.detail.value as any)}>
            <IonSegmentButton value='all'>
              All
            </IonSegmentButton>
            <IonSegmentButton value='favorites'>
              Favorites
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      }
    </IonHeader>

    <IonContent fullscreen={true}>

      <IonHeader collapse='condense'>
        {/*<IonToolbar>
          <IonTitle size='large'>Home</IonTitle>
        </IonToolbar>*/}
        <IonToolbar>
          <IonSearchbar placeholder='Search' onIonChange={(e: CustomEvent) => setSearchString(e.detail.value)}></IonSearchbar>
        </IonToolbar>
      </IonHeader>

      <IonRefresher slot='fixed' ref={ionRefresherRef} onIonRefresh={doRefresh}>
        <IonRefresherContent />
      </IonRefresher>

      <IonToast
        isOpen={showCompleteToast}
        message='Refresh complete'
        duration={2000}
        onDidDismiss={() => setShowCompleteToast(false)}
      />

      <SessionList
        schedule={schedule}
        listType={segment}
        hide={segment === 'favorites'}
      />

      <SessionList
        // schedule={schedule}
        schedule={favoritesHome}
        listType={segment}
        hide={segment === 'all'}
      />

    </IonContent>

    <IonModal
      isOpen={showFilterModal}
      onDidDismiss={() => setShowFilterModal(false)}
      swipeToClose={true}
      presentingElement={pageRef.current!}
      cssClass='session-list-filter'
    >
      <SessionListFilter
        onDismissModal={() => setShowFilterModal(false)}
      />
    </IonModal>

    <ShareSocialFab />

  </>
  
}

export default connect<OwnProps, StateProps, DispatchProps>({

  mapStateToProps: (state) => ({
    mode: getConfig()!.get('mode'),
    schedule: selectors.getSearchedHome(state),
    favoritesHome: selectors.getGroupedFavorites(state),
  }),

  mapDispatchToProps: {
    setSearchString
  },

  component: Home

})