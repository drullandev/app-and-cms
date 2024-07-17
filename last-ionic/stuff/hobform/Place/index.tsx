import React, { useState, useLayoutEffect, useMemo } from 'react';
import { PlaceProps, PlaceState } from './types';
import { IonContent, IonLabel, IonCard, IonCardContent, useIonLoading, IonImg, IonGrid, IonRow, IonCol, IonIcon, IonText, IonModal } from '@ionic/react';
import jQuery from 'jquery';
import { preparePlace } from '../../../data/utils/data';
import { translate } from '../../../data/utils/translations';
import { storeOrApi } from '../../../data/utils/data';
import { closeOutline } from 'ionicons/icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useTranslation } from 'react-i18next';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { apiUrl, placeMarkerDefault, appAssets } from '../../../../env'

SwiperCore.use([Navigation, Pagination]);

const slideOpts = {
  initialSlide: 0,
  autoHeight: true,
  centeredSlides: true,
  centeredSlidesBounds: true,
  spaceBetween: 0,
  pagination: false,
  loop: false,
};

const Place: React.FC<PlaceProps> = ({ id, setPlaceId, pageRef }) => {

  const { t } = useTranslation();

  const [place, setPlace] = useState<PlaceState>();
  const [launchLoader, dismissLoader] = useIonLoading();
  const [show, setShow] = useState(false);

  let places = useMemo(() => {
    return {
      load: async () => {
        launchLoader(t('Loading') ?? 'Loading ', 500, 'dots');
        storeOrApi('place_' + id, 'my-places?id=' + id, places.onSuccess, places.onError);
      },
      onSuccess: (place: any) => {
        places.setPlace(place)
          .then((place) => {
            dismissLoader();
            places.setTextHeight();
            places.useWindowSize();
          });
      },
      setPlace: async (place: any) =>
        await preparePlace(place)
          .then(setPlace)
          .then(() => setShow(true))
          .catch((err) => {
            console.log(err);
          }),
      onError: () => {
        dismissLoader();
      },
      timestamp: () => {
        return Date();
      },
      close: () => {
        setShow(false);
        setPlaceId('');
      },
      setTextHeight: () => {
        setTimeout(() => {
          let pageHeight = jQuery('#place-card-content').height() ?? 0;
          let imgBoxHeight = jQuery('.box').first().height() ?? 0;
          let placeGrid = jQuery('#place-grid').first().height() ?? 0;
          let value = pageHeight - imgBoxHeight - placeGrid - 20;
          if (value <= 0) return;
          jQuery('#place-text').animate({ height: value + 'px' }, 200);
        }, 1000);
      },
      useWindowSize() {
        window.addEventListener('resize', places.setTextHeight);
        places.setTextHeight();
      },
      showPictures: (place: any) => {
        setPlace(place);
      },
      hidePictures: (place: any) => {
        setPlace(undefined);
      },
    };
  }, [dismissLoader, id, launchLoader, setPlaceId, t]);

  useLayoutEffect(() => {
    places.load();
  }, [places, id]);

  return (
    <IonModal
      isOpen={show}
      cssClass="my-place-modal"
      swipeToClose={true}
      id={'place_modal_' + id.toString()}
      presentingElement={pageRef}
      animated={true}
    >
      <IonContent
        className="no-scroll"
        id="place-card-content"
      >
        {place && (
          <IonCard className="hob-card" color={undefined} button={undefined} disabled={undefined} mode={undefined} href={undefined} routerAnimation={undefined} rel={undefined} target={undefined} download={undefined} type={undefined}>
            <IonGrid id="place-grid">
              <IonRow>
                <IonCol size="2">
                  <IonImg
                    alt={place.map_marker?.name}
                    className="place-marker fade-in-5"
                    src={place.map_marker?.icon.url
                      ? appAssets + place.map_marker?.icon.url.replace('/uploads/', '') 
                      : placeMarkerDefault
                    }
                  />
                </IonCol>
                <IonCol size="8">
                  <IonRow>
                    <IonCol>
                      <IonLabel style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{place.name}</IonLabel>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonLabel style={{ fontSize: '14px' }}>{translate(place.map_marker?.translations, 'label')}</IonLabel>
                    </IonCol>
                  </IonRow>
                </IonCol>
                <IonCol size="2" onClick={() => places.close()} className="cursor-pointer">
                  <IonIcon style={{ width: '100%', height: '100%' }} icon={closeOutline} />
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonCardContent id="card-content">
              <div className="box">
                <Swiper className="overview-container groc" {...slideOpts}>
                  {place.optim && place.optim.length > 0 ? (
                    place.optim.map((image: any, index: number) => (
                      <SwiperSlide key={'place_image_' + index}>
                        <IonCard className="hob-card">
                          <IonCardContent>
                            {place.optim && place.optim.length > 1 ? (
                              <IonLabel slot="start" className="slider-pill white-text" color="primary">
                                {index + 1}/{place.optim?.length}
                              </IonLabel>
                            ) : (
                              <></>
                            )}
                            <LazyLoadImage
                              className="ken-burns"
                              alt={place.name + ' - ' + index}
                              effect="blur"
                              src={image.big.src}
                              placeholderSrc={apiUrl + image.small.url}
                            />
                          </IonCardContent>
                        </IonCard>
                      </SwiperSlide>
                    ))
                  ) : (
                    <SwiperSlide key={'place_image_noimage'}>
                      <IonCard className="hob-card">
                        <IonCardContent>
                          <LazyLoadImage
                            className="ken-burns greyscale"
                            alt={place.name}
                            effect="blur"
                            src={'/assets/no-image.webp'}
                            placeholderSrc={'/assets/no-image.webp'}
                          />
                        </IonCardContent>
                      </IonCard>
                    </SwiperSlide>
                  )}
                </Swiper>
              </div>
              <IonText id="place-text" key={'place-textarea-' + id} className="place-textarea fade-in-5" style={{ margin: '2%', overflow: 'scroll' }}>
                {translate(place.description, 'description')}
              </IonText>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonModal>
  );
};

export default React.memo(Place);
