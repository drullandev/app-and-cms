import React, { useState, useRef } from 'react';

import {
  IonToolbar,
  IonContent,
  IonPage,
  IonButtons,
  IonTitle,
  IonMenuButton,
  IonSegment,
  IonSegmentButton,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
  IonToast,
  IonModal,
  IonHeader,
  getConfig,
} from '@ionic/react';
import { options, search } from 'ionicons/icons';

import SessionList from '../../components/_extra/SessionList';
import SessionListFilter from '../../components/SessionListFilter';
import '../../styles/index.scss';

import ShareSocialFab from '../../components/ShareSocialFab';

import useStore from '../../stores/sessions.store';
import { Schedule } from '../../stores/models/Schedule';

interface OwnProps {}

const SchedulePage: React.FC<OwnProps> = () => {
  const [segment, setSegment] = useState<'all' | 'favorites'>('all');
  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  const pageRef = useRef<HTMLElement>(null);

  const mode = getConfig()!.get('mode') as 'ios' | 'md';
  const ios = mode === 'ios';

  const schedule = useStore((state) => state.schedule);
  const favoritesSchedule = useStore((state) => state.favoritesSchedule);
  const setSearchText = useStore((state) => state.setSearchText);

  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500);
  };

  return (
    <IonPage ref={pageRef} id="schedule-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          {!showSearchbar && (
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
          )}
          {ios && (
            <IonSegment
              value={segment}
              onIonChange={(e) => setSegment(e.detail.value as any)}
            >
              <IonSegmentButton value="all">All</IonSegmentButton>
              <IonSegmentButton value="favorites">Favorites</IonSegmentButton>
            </IonSegment>
          )}
          {!ios && !showSearchbar && <IonTitle>Schedule</IonTitle>}
          {showSearchbar && (
            <IonSearchbar
              showCancelButton="always"
              placeholder="Search"
              onIonInput={(e: CustomEvent) => setSearchText(e.detail.value)}
              onIonCancel={() => setShowSearchbar(false)}
            ></IonSearchbar>
          )}

          <IonButtons slot="end">
            {!ios && !showSearchbar && (
              <IonButton onClick={() => setShowSearchbar(true)}>
                <IonIcon slot="icon-only" icon={search}></IonIcon>
              </IonButton>
            )}
            {!showSearchbar && (
              <IonButton onClick={() => setShowFilterModal(true)}>
                {mode === 'ios' ? (
                  'Filter'
                ) : (
                  <IonIcon icon={options} slot="icon-only" />
                )}
              </IonButton>
            )}
          </IonButtons>
        </IonToolbar>

        {!ios && (
          <IonToolbar>
            <IonSegment
              value={segment}
              onIonChange={(e) => setSegment(e.detail.value as any)}
            >
              <IonSegmentButton value="all">All</IonSegmentButton>
              <IonSegmentButton value="favorites">Favorites</IonSegmentButton>
            </IonSegment>
          </IonToolbar>
        )}
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Schedule</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar
              placeholder="Search"
              onIonInput={(e: CustomEvent) => setSearchText(e.detail.value)}
            ></IonSearchbar>
          </IonToolbar>
        </IonHeader>

        <IonRefresher
          slot="fixed"
          ref={ionRefresherRef}
          onIonRefresh={doRefresh}
        >
          <IonRefresherContent />
        </IonRefresher>

        <IonToast
          isOpen={showCompleteToast}
          message="Refresh complete"
          duration={2000}
          onDidDismiss={() => setShowCompleteToast(false)}
        />

        <SessionList
          schedule={schedule}
          listType={segment}
          hide={segment === 'favorites'}
        />
        <SessionList
          schedule={favoritesSchedule}
          listType={segment}
          hide={segment === 'all'}
        />
      </IonContent>

      <IonModal
        isOpen={showFilterModal}
        onDidDismiss={() => setShowFilterModal(false)}
        presentingElement={pageRef.current!}
      >
        <SessionListFilter onDismissModal={() => setShowFilterModal(false)} />
      </IonModal>

      <ShareSocialFab />
    </IonPage>
  );
};

export default React.memo(SchedulePage);
