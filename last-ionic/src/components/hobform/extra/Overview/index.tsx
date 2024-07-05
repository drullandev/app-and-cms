import React, { useEffect, useMemo, useRef, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import Header from '../../common/Header'
import './types'

import jQuery from 'jquery'
import { IonPage, IonContent } from '@ionic/react'
import { getStorage } from '../../../data/utils/storage'

import FooterMenu from '../../common/FooterMenu'
import { MenuProps } from '../../../data/models/Menu'
import Slider from '../../common/Slider'
import { cardOutline } from 'ionicons/icons'
//import FavBall from '../../components/FavBall'
//import TermsPrivacy from '../../common/TermsPrivacy'
import { translate } from '../../../data/utils/translations'
import { apiUrl } from '../../../../env'

interface RoutePageProps extends RouteComponentProps<{
  route: string
  step: string
}> {
  route?: string
  step?: string
}

const Overview: React.FC<RoutePageProps> = ({ match }) => {

  const pageRef = useRef<HTMLDivElement>(null)
  const [header, setHeader] = useState<MenuProps>()
  const [processedRoute, setProcessedRoute] = useState()
  const [routeName, setRouteName] = useState('');

  const [root, setRoot] = useState(apiUrl);

  let overSlide = useMemo(() => {
    return {

      load: (match: any) => {
        getStorage('route_' + match.params.route)
          .then(route => {
            setRouteName(route.name)
            setProcessedRoute(overSlide.setSlidesData(route) as any)
            getStorage('menu_routes')
              .then(menu => {
                let m = menu
                m.name = route.name.toUpperCase()
                setHeader(m)
              })
          })

      },

      slideOpts: {
        initialSlide: match.params.step ? match.params.step : '0',
        autoHeight: false,
        centeredSlides: true,
        centeredSlidesBounds: true,
        spaceBetween: 0,
        pager: true,
        loop: false,
      },

      setSlidesData: (route: any) => {

        let
          z = 0,
          slideData = [],
          images = []

        for (let image of route.images) {
          images.push(apiUrl + image.url)
        }

        for (let place of route.places) {
          slideData.push({
            'id': place.id,
            'step': z++ + 1,
            'name': place.name,
            'routeName': route.name,
            'image': apiUrl + place.images[0].url,
            'images': place.images,
            'marker': place.map_marker ?? 4,
            'label': translate(place.description, 'label'),
            'description': translate(place.description, 'description')
          })
        }


        return slideData
      },

      licenseAdvisor: {
        color: 'soft-blue',
        class: 'blink-slow',
        icon: cardOutline,
        vertical: 'top',
        horizontal: 'end',
        slot: 'in-line'
      }
      
    }

  }, [match])

  const stateChanges = useMemo(() => {

    return {

      route: (match: any) => {
        overSlide.load(match)
      },

      header: (header: any) => {
        setTimeout(() => {
          jQuery('#header-title-label').html(header.name)
        }, 250)
      }
    }

  }, [overSlide])

  useEffect(() => { stateChanges.route(match) }, [match, stateChanges])
  useEffect(() => {
    if (header) stateChanges.header(header)
  }, [header, stateChanges])

  useEffect(()=>{
    setRoot(root)
  },[setRoot, root])

  return <IonPage ref={pageRef} key='overview'>
    {header && <Header header={header as any} />}
    <IonContent id='content' className='no-scroll'>
      {/*requireLicense && <FavBall show={true} style={overSlide.licenseAdvisor as any} jumpToStart={overSlide.showLicenseAdvisor} />*/}
      <Slider 
        root={root}
        pageRef={pageRef}
        routeName={routeName}
        slideData={processedRoute}
        step={match.params.step}
      />
    </IonContent>
    <FooterMenu index={1} />
  </IonPage>

}

export default React.memo(Overview)
