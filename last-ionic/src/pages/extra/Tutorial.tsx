import React, { useState } from 'react'
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, useIonViewWillEnter } from '@ionic/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperCore } from 'swiper'
import { arrowForward } from 'ionicons/icons'
import { setData, setMenuEnabled } from '../../data/sessions/sessions.actions'
import { setHasSeenTutorial } from '../../data/user/user.actions'
import '../../pages/Styles.scss'
//import 'swiper/swiper.min.css'
import '@ionic/react/css/ionic-swiper.css'
import { connect } from '../../data/connect'
import { RouteComponentProps } from 'react-router'
import { initialUser } from '../../data/state'

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setHasSeenTutorial: typeof setHasSeenTutorial
  setMenuEnabled: typeof setMenuEnabled
}

interface TutorialProps extends OwnProps, DispatchProps { }

const Tutorial: React.FC<TutorialProps> = ({ history, setHasSeenTutorial, setMenuEnabled }) => {
  const [showSkip, setShowSkip] = useState(true)
  let [swiper, setSwiper] = useState<SwiperCore>()

  useIonViewWillEnter(() => {
    setMenuEnabled(false)
  })
  
  const startApp = async () => { 
    await setData(initialUser)
    await setHasSeenTutorial(true)
    await setMenuEnabled(true)
    history.push('/tabs/schedule', { direction: 'none' })
  }

  const handleSlideChangeStart = () => { 
    if(!swiper) return
    setShowSkip(!swiper.isEnd)
  }

  return (
    <IonPage id="tutorial-page">
      <IonHeader no-border>
        <IonToolbar>
          <IonButtons slot="end">
            {showSkip && <IonButton color='primary' onClick={startApp}>Skip</IonButton>}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <Swiper onSwiper={setSwiper} onSlideChangeTransitionStart={handleSlideChangeStart}>
          <SwiperSlide>
            <img src="assets/img/ica-slidebox-img-1.png" alt="" className="slide-image" />
            <h2 className="slide-title">
              Welcome to <b>ICA</b>
            </h2>
            <p>
              The <b>ionic conference app</b> is a practical preview of the ionic framework in action, and a demonstration of proper code use.
            </p>
          </SwiperSlide>

          <SwiperSlide>
            <img src="assets/img/ica-slidebox-img-2.png" alt="" className="slide-image" />
            <h2 className="slide-title">What is Ionic?</h2>
            <p>
              <b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.
            </p>
          </SwiperSlide>

          <SwiperSlide>
            <img src="assets/img/ica-slidebox-img-3.png" alt="" className="slide-image" />
            <h2 className="slide-title">What is Ionic Appflow?</h2>
            <p>
              <b>Ionic Appflow</b> is a powerful set of services and features built on top of Ionic Framework that brings a totally new level of app development agility to mobile dev teams.
            </p>
          </SwiperSlide>

          <SwiperSlide>
            <img src="assets/img/ica-slidebox-img-4.png" alt="" className="slide-image" />
            <h2 className="slide-title">Ready to Play?</h2>
            <IonButton fill="clear" onClick={startApp}>
              Continue
              <IonIcon slot="end" icon={arrowForward} />
            </IonButton>
          </SwiperSlide>
        </Swiper>
      </IonContent>
    </IonPage>
  )
}

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: ({
    setHasSeenTutorial,
    setMenuEnabled
  }),
  component: Tutorial
})