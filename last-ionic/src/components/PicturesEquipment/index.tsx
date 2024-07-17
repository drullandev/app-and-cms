import React, { useRef } from 'react';
import { IonLabel, IonCol, IonGrid, IonRow, IonContent, IonModal, IonCard, IonIcon, IonCardContent } from '@ionic/react';
import { closeOutline, imagesOutline } from 'ionicons/icons';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { Swiper, SwiperSlide } from 'swiper/react';

//import 'swiper/components/pagination/pagination.min.css';
import SwiperCore, { Pagination } from 'swiper';
//import { PicturesProps } from './types';
import { apiUrl } from '../../../../env'

export interface PicturesProps {
  show: boolean
  close?: Function
  boat: any
  pageRef: any
}

SwiperCore.use([Pagination]);

const PicturesEquipment: React.FC<PicturesProps> = ({
  boat,
  show,
  close,
  pageRef
}) => {

  const slider = useRef(null);

  const slideOpts = {
    initialSlide: 0,
    autoHeight: true,
    centeredSlides: true,
    centeredSlidesBounds: true,
    spaceBetween: 0,
    pagination: false,
    loop: false,
  };

  return (
    <IonModal
      isOpen={show}
      key='pictures'
      id={'boat_modal_' + boat?.id.toString()}
      swipeToClose={true}
      presentingElement={pageRef}
      animated={true}
    >
      <IonContent
        className='no-scroll'
        id='boat-modal-content'
        style={{ height: '100%', backgroundColor: '#eeeeee' }}
      >
        {boat && <>
          <IonGrid id='place-grid'>
            <IonRow style={{ height: '80px' }}>
              <IonCol size='2' className='ion-text-center ion-justify-content-center'>
                <IonIcon style={{ width: '100%', height: '100%' }} size='large' icon={imagesOutline} />
              </IonCol>
              <IonCol size='8' className='ion-text-center ion-justify-content-center' style={{ padding: '8% 0 8% 0' }}>
                <IonRow>
                  <IonCol>
                    <IonLabel style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{boat.name ?? ''}</IonLabel>
                  </IonCol>
                </IonRow>
              </IonCol>
              {close && (
                <IonCol size='2' onClick={() => close()} className='cursor-pointer'>
                  <IonIcon style={{ width: '100%', height: '100%' }} icon={closeOutline} />
                </IonCol>
              )}
            </IonRow>
          </IonGrid>
          <Swiper ref={slider} className='overview-container groc' {...slideOpts}>
            {boat.optim &&
              boat.optim.map((picture: any, index: number) => (
                <SwiperSlide className={'boatSlide'} key={'boat-slide-' + index}>
                  <IonCard className='hob-card'>
                    <IonCardContent>
                      <div className='boat-box'>
                        <IonLabel slot='start' className='slider-pill white-text' color='primary'>
                          {index + 1}/{boat.optim.length}
                        </IonLabel>
                        <LazyLoadImage
                          className='ken-burns'
                          alt={picture.name + ' - ' + index}
                          effect='blur'
                          src={picture.big.src}
                          placeholderSrc={apiUrl + picture.small.url}
                        />
                      </div>
                    </IonCardContent>
                  </IonCard>
                </SwiperSlide>
              ))}
          </Swiper>
        </>}
      </IonContent>
    </IonModal>
  );
};

export default React.memo(PicturesEquipment);
