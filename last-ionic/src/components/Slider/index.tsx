import React, { useState } from 'react';
import jQuery from 'jquery';
import { IonCard, IonCardContent, IonImg, IonText } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { imagesOutline } from 'ionicons/icons';

// Dependencias locales de tu proyecto
import { SlideRoute } from '../../../data/models/SlideRoute';
import { setSubtitle } from '../../../data/utils/jquery';
import { getStorage } from '../../../data/utils/storage';
import { translate } from '../../../data/utils/translations';
import { apiUrl } from '../../../../env';

// Componentes locales
import FavBall from '../FavBall';
import Pictures from '../Pictures';

import { SlideData } from './types';

const Slider: React.FC<SlideData> = ({ root, step, slideData, pageRef }) => {

  const [slide, setSlide] = useState<SlideRoute>()
  const [showPictures, setShowPictures] = useState<boolean>(false)

  let slider = {

    sliderOpts: {
      initialSlide: parseInt(step),
      autoHeight: false,
      centeredSlides: true,
      centeredSlidesBounds: true,
      spaceBetween: 0,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      loop: false,
    },

    ucfirst(str: string) {
      var firstLetter = str.substr(0, 1);
      return firstLetter.toUpperCase() + str.substr(1)
    },

    switchHeaderLabel: (event: any, slides: SlideRoute[], label: any) => {

      let labelClass = '#header-subtitle'
      let index = 0

      if (event.target !== null) {

        event.target.getActiveIndex()
          .then((value: any) => (index = value))
          .then(() => {

            if (slides[index] !== undefined) {

              let result = ''
              let now = jQuery(labelClass).html()

              if (slides[index].label !== undefined) result += slides[index].label

              getStorage('marker_' + slides[index].marker)
                .then(icon => {
                  result = slider.ucfirst(slides[index].name) + ' - ' + translate(icon.translations, 'label')
                  if (result !== now) {
                    setSubtitle(result, '#header-subtitle-label', '#header-title-container')
                  }
                  let icone = apiUrl + icon.icon.url
                  let cont = jQuery('#headerIcon')
                  cont.fadeOut('fast', () => {
                    cont.attr('src', icone)
                    cont.css('margin-top', '-15%')
                    cont.fadeIn('slow')
                  })
                })

            } else {

              setSubtitle(false, '#header-subtitle-label', '#header-title-container')
            }

          })

      }

    },

    showPictures: (slide: any) => {
      setSlide(slide)
      setShowPictures(true)
    },

    hidePictures: () => {
      setShowPictures(false)
      setSlide(undefined)
    },

  }

  return <>{slider && slideData !== undefined &&
    <Swiper
      className="overview-container" 
      key={slideData.map((slide: any) => slide[0]).join('_')}
      {...slider.sliderOpts}
    >
      {slideData.map((slide: any, i: number) => (
        <SwiperSlide key={`slider-${slide.id}`}>
          <IonCard className="hob-card">
            <IonCardContent style={{ width: '100%' }}>
              <div className="box ken-burns">
                <img className="fade-in-2" src={slide.image} alt={slide.name} />
              </div>
              {slide.map_marker && (
                <IonImg
                  className="place-marker"
                  style={{ width: '15%', zIndex: '2', margin: '-8% 2%', textShadow: '90px 2px' }}
                  src={apiUrl + slide.map_marker.icon.url}
                  alt=""
                />
              )}
              <IonText id="route-text" className="hob-slide-textarea hob-route-text" key={`textarea_${i}`} style={{ width: '100%' }}>
                {slide.description}
              </IonText>
              {slide.images.length > 1 && (
                <div onClick={() => slider.showPictures(slide)}>
                  <FavBall
                    show={true}
                    style={{
                      class: 'blink-slow',
                      icon: imagesOutline,
                      slot: 'end',
                      color: 'soft-blue',
                      vertical: 'top',
                      horizontal: 'start',
                    }}
                  />
                </div>
              )}
            </IonCardContent>
          </IonCard>
        </SwiperSlide>
      ))}
    </Swiper>
  }{slide && <Pictures
    root={slide.root}
    pictures={slide.images}
    show={showPictures}
    name={slide.name}
    close={slider.hidePictures}
    pageRef={pageRef.current} />}
  </>

}

export default React.memo(Slider)
