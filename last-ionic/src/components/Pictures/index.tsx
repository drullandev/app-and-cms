import React, { useEffect, useState } from 'react'
import { IonLabel, IonCol, IonGrid, IonRow, IonContent, IonModal, IonCard, IonIcon } from '@ionic/react'
import { closeOutline, imagesOutline } from 'ionicons/icons'
import SwiperCore, { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { PicturesProps } from './types'

SwiperCore.use([Navigation, Pagination]);

const Pictures: React.FC<PicturesProps> = ({ root, pictures, show, close, name, pageRef }) => {

  const [amount, setAmount] = useState<number>(0);

  const slideOpts = {
    initialSlide: 0,
    autoHeight: true,
    centeredSlides: true,
    centeredSlidesBounds: true,
    spaceBetween: 0,
    pagination: false,
    loop: false,
  };

  useEffect(() => {
    setAmount(pictures ? pictures.length : 0);
  }, [pictures]);

  const handleSwiper = (swiper: SwiperCore) => {
    // Aquí puedes acceder a la instancia de Swiper si es necesario
    swiper.slideTo(0, 200);
    swiper.pagination.update();
  };

  return (
    <IonModal key="pictures" isOpen={show} swipeToClose={true} presentingElement={pageRef || undefined}>
      <IonContent className="no-scroll" style={{ height: '100%', backgroundColor: '#eeeeee' }}>
        <IonGrid id="place-grid">
          <IonRow>
            <IonCol size="2" className="ion-text-center">
              <IonIcon size="large" icon={imagesOutline} />
            </IonCol>
            <IonCol size="8" className="ion-text-center">
              <IonRow>
                <IonCol style={{ padding: '8% 0 8% 0' }}>
                  <IonLabel style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{name ?? ''}</IonLabel>
                </IonCol>
              </IonRow>
            </IonCol>
            {close && (
              <IonCol size="2" onClick={() => close()} className="cursor-pointer">
                <IonIcon style={{ width: '100%', height: '100%' }} icon={closeOutline} />
              </IonCol>
            )}
          </IonRow>
        </IonGrid>
        <Swiper className="overview-container groc" onSwiper={handleSwiper} {...slideOpts}>
          {pictures &&
            pictures.map((picture: any, index: number) => (
              <SwiperSlide key={'boat-picture-' + index}>
                <IonCard className="hob-card  ion-justify-content-evenly" style={{ paddingTop: '30%' }}>
                  <div className="picture-box">
                    <img className="fade-in-2" src={root + picture.url} alt="" />
                    <IonLabel style={{ marginTop: '-10px' }}>
                      {name} {index + 1}/{amount}
                    </IonLabel>
                  </div>
                </IonCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </IonContent>
    </IonModal>
  );
};

export default React.memo(Pictures);
