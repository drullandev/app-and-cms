import React, { useEffect, useMemo, useState } from 'react'
import { IonCard, IonCardContent, IonLabel, IonText } from '@ionic/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper'
import { translate } from '../../../data/utils/translations'

import jQuery from 'jquery'
import { setSubtitle } from '../../../data/utils/jquery'

// Install Swiper modules
SwiperCore.use([Pagination])

export interface SlideData {
  root: string
  slideData: any
  step: string
}

const SliderArticle: React.FC<SlideData> = ({ root, step, slideData }) => {

  const [slide, setSlide] = useState<SwiperCore>(slideData)
  const [swiper, setSwiper] = useState<SwiperCore>();

  let slider = useMemo(() => {

    return {

      load: () => {
        if (swiper) {
          swiper.slideTo(parseInt(step),200)
        }
      },

      setSlider: (data: any)=>{
        if (data && data.length > 0) {
          // Access the first element and its 'translations' property
          const firstItem = data[0];
          const translations = firstItem.translations;
      
          // Make sure 'translations' is defined before using it
          if (translations) {
              // Call the 'translate' function with the 'label' from translations
              slider.setSubtitle(translate(translations, 'title'));
          }
        }
      },
      switchHeaderLabel: (swiper: SwiperCore, pages: any[], title: any) => {

        let header = jQuery('#header-title-label');
        let subtitle = jQuery('#header-subtitle-label');

        let index = swiper.activeIndex
      
        if (pages[index] !== undefined) {

          let result = ''
      
          let label = translate(pages[index].translations, 'title')
      
          if (label !== header.html()) {

            result += label

            if (result !== subtitle.html()) {
              slider.setSubtitle(result)
            } else if (result === subtitle.html()) {
              // El resultado coincide con el subtítulo actual
            } else {
              slider.setSubtitle(false)
            }

          } else {
            slider.setSubtitle(false)
          }

        }

      },

      setSubtitle: (have: any) => setSubtitle(have, '#header-subtitle-label', '#header-title-container'),

    }
  }, [step, swiper])

  useEffect(() => {
    slider.load()
  }, [slider])

  useEffect(() => {
    slider.setSlider(slideData)
  }, [slider, slideData]);

  return (
    <>
      {slide !== undefined && (
        <Swiper
          pagination={{ clickable: true }}
          onSwiper={(swiper) => setSwiper(swiper)}
          onSlideChange={(event) => slider.switchHeaderLabel(event, slideData, '')}
        >
          {slideData.map((r: any, index: number) => (
            <SwiperSlide key={'article-slide-' + r.id}>
              <IonCard className="hob-card">
                <IonCardContent>
                  <div className="box fade-in-2">
                    <IonLabel slot="start" className="slider-pill" color="primary">
                      {index + 1}/{slideData.length}
                    </IonLabel>
                    <img className="fade-in-2" src={root + r.image.url} alt={r.slug} />
                  </div>
                  <IonText className="hob-slide-textarea">
                    {translate(r.translations, 'description')}
                  </IonText>
                </IonCardContent>
              </IonCard>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  )
}

export default React.memo(SliderArticle)
