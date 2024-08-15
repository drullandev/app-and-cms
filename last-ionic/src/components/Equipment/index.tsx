import React, { useEffect, useState, useMemo, useRef } from 'react'

import { IonContent, IonPage, IonCard, IonCardContent, IonItem, IonGrid, IonRow, IonCol, IonImg, IonThumbnail, IonLabel, IonText, useIonLoading } from '@ionic/react'
import { useHistory } from 'react-router'
import { useTranslation } from 'react-i18next'
import { imagesOutline } from 'ionicons/icons'
import jQuery from 'jquery'

import { MenuProps } from '../../../data/models/Menu'
import { getStorage } from '../../../data/utils/storage'
import { prepareBoats } from '../../../data/utils/data'
import { setSubtitle } from '../../../data/utils/jquery'
import { EquipmentProps } from '../../../data/models/EquipmentProps'

import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

import Header from '../../common/Header'
import FooterMenu from '../../common/FooterMenu'
//import TermsPrivacy from '../../common/TermsPrivacy'
import { translate } from '../../../data/utils/translations'
import PicturesEquipment from '../../common/PicturesEquipment'
import FavBall from '../../common/FavBall'
import { Swiper, SwiperSlide } from 'swiper/react'

import SwiperCore, { Navigation, Pagination } from 'swiper'

import { apiUrl, accessHref, translations } from '../../../../env'

SwiperCore.use([ Navigation, Pagination])

const Equipment: React.FC = () => {

  const { t } = useTranslation();
  const history = useHistory()
  const pageRef = useRef<HTMLDivElement>(null)

  const [header, setHeader] = useState<MenuProps[]>([])
  const [boat, setBoat] = useState<EquipmentProps>()
  const [boats, setBoats] = useState<EquipmentProps[]>()
  const [showPictures, setShowPictures] = useState<boolean>(false)
  const [launchLoader, dismissLoader] = useIonLoading()

  let eqpObj = useMemo(() => {

    return {

      load: async () => {

        const ac = new AbortController()

        launchLoader(t('Loading') ?? 'Loading', 345, 'dots')

        //getStorage('equipments')
        //  .then(equipments => {
        //let creator_id = sessionStorage.getItem("creator:id")
        getStorage('creator:id')
          .then((creator_id) => {
            if (creator_id) {
              getStorage('boats_' + creator_id)
                .then(eqpObj.setBoats)
            }
          })
          .catch(eqpObj.redirectAccess)
        //  })

        getStorage('menu_equipment')
          .then(setHeader)
          .catch(eqpObj.redirectAccess)
        dismissLoader()
        
        return () => ac.abort()
      },

      setBoats: async (boats: any) => await prepareBoats(boats).then(setBoats),

      slideOpts: {
        initialSlide: 0,
        autoHeight: false,
        centeredSlides: true,
        centeredSlidesBounds: true,
        spaceBetween: 0,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        loop: false
      },

      setSubtitle: (have: any) => setSubtitle(have, '#header-subtitle-label', '#header-title-container'),

      switchHeaderLabel: async (event: any, boats: EquipmentProps[]) => {
        let subtitle = jQuery('#header-subtitle-label')
        let index = 0
        if (event && event.target !== undefined) {
          await event.target.getActiveIndex()
            .then((value: any) => (index = value))
            .then(() => {
              if (boats[index] !== undefined) {
                let result = ''
                if (boats[index].name !== undefined) result += boats[index].name
                if (result !== subtitle.html()) eqpObj.setSubtitle(result)
              } else {
                eqpObj.setSubtitle(false)
              }
            })
        }
      },

      setTextHeight: () => {
        setTimeout(() => {
          const footerElement = jQuery('#footer')
          const equipmentRowsElement = jQuery('#equipment-rows')
          const equipmentBoxElements = jQuery('.equipment-box')

          if (footerElement.length > 0 && equipmentRowsElement.length > 0) {
            const pageHeight = footerElement.position()?.top ?? 0
            const imgBoxHeight = equipmentRowsElement.position()?.top ?? 0
            const value = pageHeight - imgBoxHeight - 65

            equipmentBoxElements.animate({ height: Math.floor(value) + 'px' }, 200)
          } else {
            eqpObj.setTextHeight()
          }
        }, 400)
      },

      showPictures: (boat: any) => {
        setBoat(boat)
        setShowPictures(true)
      },

      hidePictures: () => {
        //setBoat(undefined)
        setShowPictures(false)
      },

      renderSlides: (boats: EquipmentProps[]) => <>
        {boats.map((boat: EquipmentProps, i: number) =>
          <SwiperSlide className={'boatSlide'} key={'boat-slide-' + boat.id + '-' + i}>
            <IonCard className='hob-card' button={undefined} color={undefined} disabled={undefined} mode={undefined} href={undefined} routerAnimation={undefined} rel={undefined} target={undefined} download={undefined} type={undefined}>
              <IonCardContent>
                <div className='boat-box'>
                  <LazyLoadImage
                    className='ken-burns'
                    effect='blur'
                    delayTime={1000}
                    alt={boat.name}
                    src={boat.optim[0].big.src}
                    placeholderSrc={apiUrl + boat.optim[0].small.url}
                  />

                    <div onClick={() => { eqpObj.showPictures(boat) }}>
                      <FavBall show={true} 
                        style={{
                          class: 'blink-slow',
                          icon: imagesOutline,
                          slot: 'end',
                          color: 'soft-blue',
                          vertical: 'top',
                          horizontal: 'start'
                        }}
                        jumpToStart={eqpObj.showPictures}
                      />
                    </div>

                </div>
                <div className={'boatData'}>
                  <IonLabel className='left roboto bold see fade-in-5'>{boat.name + (eqpObj.boatSubtext(boat) !== '' ? ' • ' : '')}</IonLabel>
                  <IonLabel className='header-title roboto'>{eqpObj.boatSubtext(boat)}</IonLabel>
                </div>
                {eqpObj.descriptionPannel(boat)}
                {/*<div className='equipment-box' style={{ overflow: 'scroll', marginTop: '20px', marginBottom: '-30px' }}>
                  <IonGrid>
                    <IonRow>
                      {eqpObj.descriptionPannel(boat)}
                    </IonRow>
                  </IonGrid>
                </div>*/}
               
              </IonCardContent>

            </IonCard>

          </SwiperSlide>

        )}
      </>,

      boatSubtext: (boat: any) => {
        var details = ''
        if (boat.type_model !== null) details = details + boat.type_model
        if (details !== '') details += ', '
        if (boat.length_boat) details = details + boat.length_boat + ' ' + t('meters') + ' & '
        if (boat.horse_power) details = details + boat.horse_power + ' H.P. '
        return details
      },

      renderEquipments: (equipment: any, showType: string) => {
        let byTypes = preparingEquipmentsData(equipment, showType.toLowerCase())
        return byTypes.length > 0
          ? (<div id='equipment-rows'>
              <IonRow className='left'>
                <IonCol className='roboto bold left-equipment fade-in-2'>{t(showType)}</IonCol>
              </IonRow>
              <IonRow className='hob-equipment'>
                {byTypes.map((equipment: any, index: number) => (
                  <IonCol key={'hob-element-col-' + index} className='equipment-col fade-in-2' size='4'>
                    <IonThumbnail
                      key={equipment.name}
                      className='cercle-shape cursor-pointer'>
                      <IonImg src={equipment.icon} alt='' className='fade-in-2' />
                    </IonThumbnail>
                    {byTypes[index].name}
                  </IonCol>
                ))}
              </IonRow>
              <div className="swiper-pagination"></div>
            </div>)
          : <></>
      },

      equipmentPannel: (equipments: any) => {
        return equipments !== ''
          ? ( <IonGrid>
                {eqpObj.renderEquipments(equipments, t(translations.provided).toUpperCase())}
                {eqpObj.renderEquipments(equipments, t(translations.recommended).toUpperCase())}
              </IonGrid>)
          : ( <IonItem color={undefined} button={undefined} disabled={undefined} lines={undefined} mode={undefined} href={undefined} routerAnimation={undefined} rel={undefined} target={undefined} download={undefined} type={undefined} detail={undefined} detailIcon={undefined}>
                <IonLabel title={t(translations.noEquipment) ?? 'No equipment'} />
              </IonItem>)
      },

      descriptionPannel: (boat: any) => {
        return <>
          <IonText id='route-text' className='hob-slide-textarea hob-route-text' key={'textarea_'+boat.id} style={{ width: '100%' }}>
            {translate(boat.translations, 'description')}
          </IonText>
        </>
      },

      findByKey: (id: number, array: any) => {
        for (let equipment of array as any) {
          if (id === equipment.id) return equipment
        }
      },

      redirectAccess: () => {
        history.replace(accessHref)
      }

    }

  }, [dismissLoader, history, launchLoader, t])

  const preparingEquipmentsData = (equipments: any, showType: any) => {
    var byTypes: { id: any, type: any, showType: any, name: any, icon: string }[] = []
    if (equipments) {
      for (let equipment of equipments) {
        if (equipment.equipment_type.name.toLowerCase() === showType.toLowerCase()) {
          let equip = {
            'id': equipment.app_equipment.id + equipment.equipment_type.id,
            'type': equipment.equipment_type.name,
            'showType': equipment.equipment_type.name,
            'name': translate(equipment.app_equipment.description, 'name'),
            'icon': apiUrl + equipment.app_equipment.caret.url,
            'description': translate(equipment.app_equipment, 'description')
          }
          byTypes.push(equip)
        }
      }
    }
    return byTypes
  }

  useEffect(() => {
    eqpObj.load()
  }, [eqpObj])

  return <IonPage ref={pageRef} key='equipment' id='equipment'>
    {header && <Header header={header as any} />}
    <IonContent className='no-scroll' style={{ height: '100vh' }}>
      {boats &&
        <Swiper
          style={{ height: '100vh' }}
          className='overview-container'
          key={boats && boats.map(boat => boats[0]).join('_')}
          {...eqpObj.slideOpts}
          onSwiper={(swiper: any) => {
            eqpObj.switchHeaderLabel(swiper, boats)
            eqpObj.setTextHeight()
            swiper.slideTo(0, 100)
            swiper.pagination.update()
          }}
          onSlideChange={(swiper: any) => eqpObj.switchHeaderLabel(swiper, boats)}
        >
          {boats && eqpObj.renderSlides(boats)}
        </Swiper>
      }
    </IonContent>
    <PicturesEquipment
        show={showPictures}
        boat={boat}
        close={eqpObj.hidePictures}
        pageRef={pageRef.current}
      />
    <FooterMenu index={1} />
  </IonPage>

}

export default React.memo(Equipment)