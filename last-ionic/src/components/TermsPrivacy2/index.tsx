import React, { useEffect, useState, useMemo, useRef } from 'react'
import { IonLabel, IonCol, IonGrid, IonRow, IonContent, IonCheckbox, IonModal, IonText } from '@ionic/react'
import { useHistory } from 'react-router'
import { warning } from 'ionicons/icons'
import { Geolocation } from '@ionic-native/geolocation'
import { translate } from '../../../data/utils/translations'
import { getStorage, setStorage } from '../../../data/utils/storage'
import Toast from '../Toast'
import { ToastProps } from '../Toast/types'
import { useTranslation } from 'react-i18next'
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { translations } from '../../../../env'

const testing = false

export interface PingaProps {
  showTerms: any
  setShowTerms: any
}

SwiperCore.use([Navigation, Pagination]);

const TermsPrivacy2: React.FC<PingaProps> = ({showTerms, setShowTerms}) => {

  const history = useHistory()
  const slider = useRef(null)
  const { t } = useTranslation()

  const [toast, setToast] = useState<ToastProps>()
  const [articles, setArticles] = useState<[]>([])

  //const [showEnd, setShowEnd] = useState<boolean>(true)
  //const [showModal, setShowModal] = useState<boolean>(false)
  //const [endText, setEndText] = useState(t(translations.acceptGeoloc))
  //const [showLoader, setShowLoader] = useState(false)

  const slideOpts = {
    initialSlide: 0,
    autoHeight: true,
    centeredSlides: true,
    spaceBetween: 0,
    loop: false
  }
  

  const termsObj = useMemo(() => {

    return {

      // Validate if logged and accepted terms
      load: () => {
        const ac = new AbortController()
        //termsObj.loadCurrentLocation()
        //termsObj.evaluateLogged()
        //termsObj.evaluateAcceptation()
        termsObj.startProcess()

        sessionStorage.getItem("autosave")

        return () => ac.abort()
      },

      // Validate is logged
      evaluateLogged: () => {
        getStorage('user')
          .then(user => {
            if (user) {
              //XXX: You cannot mantain session over PWA as sessionStorage
              //let creator_id = sessionStorage.getItem("creator:id")
              getStorage('creator:id').then((creator_id) => {
                if (!creator_id) {
                  termsObj.goToAccess()
                } else {
                  return true
                }
              })
            }else{
              termsObj.goToAccess()
            }
          })
      },

      goToAccess: () => {
        setToast({
          'message': t(translations.mustReconnect) ?? 'Must reconnect',
          'color': 'danger',
          'show': true,
          'duration': 2000,
          'type': 'error',
          'icon': warning,
          'timestamp': Date.now()
        })
        //setTimeout(() => { history.replace(accessHref) }, 2000)
      },

      evaluateAcceptation: () => {
        getStorage('accepted')
          .then(accepted => {
            if (!accepted) {
              getStorage('terms')
                .then(terms => {
                  if (terms === null) {
                    termsObj.startProcess()
                  } else {
                    getStorage('privacy')
                      .then(privacy => {
                        if (privacy === null) {
                          termsObj.startProcess()
                        } else {
                          termsObj.validateConditions(terms, privacy)
                          /*getStorage('location')
                            .then(location => {
                              if (location === null) {
                                termsObj.allowGeoposition()
                              } else {
                                termsObj.validateConditions(terms, privacy)
                              }
                            })
                          */
                        }
                      })
                  }
                })
            }
          }
          )
      },

      startProcess: () => {
        getStorage('article_terms-and-conditions')
          .then(article => {
            setArticles(article.children)
          }).catch(termsObj.reloadCurPage)
        termsObj.openTermsModal()
      },

      validateConditions: (terms?: any, privacy?: any) => {
        if (terms && privacy ) {
          getStorage('accepted')
            .then(accepted => {
              if (!accepted) {
                //setShowLoader(true)
                setToast({
                  'message': t(translations.thanksAccept) ?? 'Thanks!',
                  'color': 'success',
                  'show': true,
                  'duration': 2000,
                  'type': 'warning',
                  'icon': warning,
                  'timestamp': Date.now()
                })
                setStorage('accepted', true)
                setTimeout(() =>  setShowTerms(false), 2000)
              }
            })
        } else {
          //setShowModal(true)
        }
      },

      settingTerms: (slug: string, value: any) => {

        if (slug === 'terms-and-conditions') {

          setStorage('terms', value)
          setTimeout(() => { termsObj.onCheck('next') }, 300)

        } else if (slug === 'privacy-policy') {

          setStorage('privacy', value)

          getStorage('terms').then(terms => {

            if (!terms) {
              setTimeout(() => { termsObj.onCheck('prev') }, 100)
            } else {

              if (value) {

                getStorage('location')
                  .then(location => {
                    if (location === null) {
                      setTimeout(() => { termsObj.onCheck('next') }, 300)
                      termsObj.allowGeoposition()
                    } else {
                      //setEndText(t(translations.thanksAccept),)
                      //setShowEnd(true)

                      termsObj.onCheck('next')
                      setTimeout(() => { termsObj.reloadCurPage() }, 2000)
                    }
                  })

              }

            }

          })

        }

        termsObj.evaluateAcceptation()

      },

      onCheck: (direction: string) => {
        // @ts-ignore: Object is possibly 'null'.
        slider.current.getSwiper().then(swiper => {
          termsObj.moveSwiper(direction, swiper)
        })
      },

      moveSwiper: (directionStep: string, swiper: any) => {
        if (directionStep === 'next') {
          swiper.slideNext()
        } else if (directionStep === 'prev') {
          swiper.slidePrev()
        } else {
          swiper.slideTo(directionStep, 200)
        }
      },

      openTermsModal: () => {return null},//setShowModal(true),

      closeTermsModal: () => {return null}, //setShowModal(false),

      reloadCurPage: () => history.go(0),

      loadCurrentLocation: async () => {
        let uri = history.location.pathname.split('/')[2]
        if (uri === 'navigate' || uri === 'routes') {
          try {
            let position = await Geolocation.getCurrentPosition()
            if (position.coords.latitude !== undefined) {
              let loqui = { lat: position.coords.latitude, lng: position.coords.longitude, zoom: 18 }
              setStorage('location', loqui)
            }
          } catch (e) {
            if (testing) console.log('error', e)
          }
        }
      },

      slideOpts: {
        initialSlide: '0',
        autoHeight: true,
        centeredSlides: true,
        centeredSlidesBounds: true,
        spaceBetween: 0,
        pager: false,
        loop: false,
      },

      allowGeoposition: async () => {
        try {
          await navigator.geolocation.getCurrentPosition(termsObj.geoAccepted)
        } catch (e) {
          if (testing) console.log('error', e)
        }
      },

      geoAccepted: (position: any) => {
        let loqui = { lat: position.coords.latitude, lng: position.coords.longitude, zoom: 18 }
        //setEndText(t(translations.acceptedGeoloc))
        //setShowLoader(true)
        setStorage('location', loqui)
        termsObj.evaluateAcceptation()
      },

    }

  }, [history, setShowTerms, t])

  useEffect(()=>termsObj.load(), [termsObj])
  

  return <>
    <IonModal isOpen={showTerms}>

      <IonContent className='groc'>

        <Swiper {...slideOpts}>

            {articles && articles.map((slide: any, index: number) => {
              return (
                <SwiperSlide key={'terms-privacy-' + index} className="groc" style={{ height: '100vh' }}>
                  <IonGrid slot="top" className="groc">
                    <IonRow style={{ height: '5vh' }}>
                      <IonCol size="1"></IonCol>
                      <IonCol size="10" className="ion-text-center">
                        <IonLabel className="bold fade-in-2" style={{ fontSize: '1.2rem' }}>
                          {index + 1 + '/' + articles.length}.-{translate(slide.translations, 'title')}
                        </IonLabel>
                      </IonCol>
                      <IonCol size="1"></IonCol>
                    </IonRow>

                    <IonRow style={{ height: '5vh' }}>
                      <IonCol size="1"></IonCol>
                      <IonCol size="10" className="ion-text-left">
                        <IonLabel className="bold fade-in-2">{translate(slide.translations, 'label')}</IonLabel>
                      </IonCol>
                      <IonCol size="1"></IonCol>
                    </IonRow>

                    <IonRow style={{ height: '50vh' }}>
                      <IonCol size="1"></IonCol>
                      <IonCol size="10" style={{ maxHeight: '50vh', overflow: 'scroll' }} className="ion-text-left fade-in-5">
                        <IonText style={{ maxHeight: '50vh', overflow: 'scroll' }}>
                          {translate(slide.translations, 'description')}
                        </IonText>
                      </IonCol>
                      <IonCol size="1"></IonCol>
                    </IonRow>

                    <IonRow className="groc">
                      <IonCol size="12">
                        <IonRow>
                          <IonCol size="1"></IonCol>
                          <IonCol size="8">
                            <IonLabel className="bold">
                              {t('Yes') + ', ' + translate(slide.translations, 'label')}
                            </IonLabel>
                          </IonCol>
                          <IonCol size="2">
                            <IonCheckbox
                              className="groc"
                              name="terms"
                              color="soft-blue"
                              onClick={(e: any) => {
                                termsObj.settingTerms(slide.slug, e.target.checked);
                              }}
                            />
                          </IonCol>
                          <IonCol size="1"></IonCol>
                        </IonRow>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </SwiperSlide>
              );
            })}


        </Swiper>

      </IonContent>

    </IonModal>

    {toast && <Toast {...toast} />}

  </>
}

export default React.memo(TermsPrivacy2)