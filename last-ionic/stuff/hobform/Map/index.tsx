/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react'

import { IonContent, IonButton, IonCol, IonGrid, IonLabel, IonRow, useIonLoading, IonIcon, IonAlert, useIonAlert } from '@ionic/react'
import { useHistory } from 'react-router'
import { analyticsOutline, navigateOutline } from 'ionicons/icons'

import mapboxgl from 'mapbox-gl'
//import 'mapbox-gl/dist/mapbox-gl.css'

import { Route } from '../../../data/models/Route'
import { IGeoTag } from '../../../data/models/IGeoTag'
import { GLocation } from '../../../data/models/GLocation'
import { getStorage, setStorage } from '../../../data/utils/storage'

import Place from '../Place'
import Alert from '../../common/Alert'
import FavBall from '../../common/FavBall'
import { AlertProps } from '../../common/Alert/types'
import MapHeader from '../MapHeader'
import { useTranslation } from 'react-i18next'
import { mapboxKey } from '../../../../env'
import { apiUrl, main_zoom, main_center, mapStyle, translations} from '../../../../env'

mapboxgl.accessToken = mapboxKey;

const locatorStyle = { color: 'soft-blue', class: 'blink-slow', icon: navigateOutline, vertical: 'bottom', horizontal: 'end', slot: 'fixed' }
const defLoader = { loading: false, message: 'Loading...', timeout: 250 }
const initCenter = { lat: main_center[0], lng: main_center[1], zoom: main_zoom }
const initPolyline = { source: '', layer: '' }

const mapOps = {
  geolocator: new mapboxgl.GeolocateControl({

    positionOptions: {
      enableHighAccuracy: true
    },

    // When active the map will receive updates to the device's location as it changes.
    trackUserLocation: true,

    //By default a dot will be shown on the map at the user's location. Set to false to disable.
    showUserLocation: true,

    //If true an arrow will be drawn next to the user location dot indicating the device's heading. This only has affect when trackUserLocation is true .
    showUserHeading: true,

  }),
}

export interface MapProps {
  style: any
  showSelector?: true | boolean
  geolocation?: false | boolean
  urlSelected?: any
  view?: string
  pageRef: any
  scroll: false | boolean
}

const MyMap: React.FC<MapProps> = ({ style, showSelector, geolocation, urlSelected, pageRef, scroll }) => {

  const { t } = useTranslation();
  const history = useHistory()
  const testing = true

  // MAP
  const mapDiv = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<mapboxgl.Map>()

  const [present] = useIonAlert()

  // LOCATOR BUTTON // TODO: RESOLVE BETTER hehehehe
  const [start, setStart] = useState<GLocation>()
  const [geolocating, setGeolocating] = useState<boolean>()

  // ROUTES
  const [selected, setSelected] = useState<string>('0')
  const [route, setRoute] = useState<Route>()
  const [routes, setRoutes] = useState<Route[]>([])
  const [polygons, setPolygons] = useState<IGeoTag[]>([])
  const [polyline, setPolyline] = useState<IGeoTag>(initPolyline)

  // PLACES MODAL
  const [placeId, setPlaceId] = useState<string>('')
  //const [placeModalStatus, setPlaceModalStatus] = useState(false)

  // OVERLAYED LOADER
  const [loader] = useState(defLoader)
  const [launchLoader, dismissLoader] = useIonLoading()
  const [alert, setAlert] = useState<AlertProps>()

  const mapObj = {

    load: async (location: GLocation) => {
      //let loading = 
      launchLoader(t('Loading') ?? 'Loading', 345, 'dots')
      //let creator_id = sessionStorage.getItem("creator:id")
      getStorage('creator:id').then((creator_id) => {
        if (creator_id) {
          getStorage('routes_' + creator_id)
            .then(routes => {
              let published = []
              for (let route of routes) {
                if (route.published) {
                  published.push(route)
                }
              }
              setRoutes(published)
            })
        }
      })

      dismissLoader()

      await mapObj.map.attach(location ? location : initCenter, setMap, mapDiv)

    },

    map: {

      attach: async (
        location: GLocation,
        setMap: React.Dispatch<React.SetStateAction<any>>,
        mapDiv: React.RefObject<HTMLDivElement>
      ) => {

        if (!map && mapDiv.current) {

          let mapVars = {
            container: mapDiv.current || '',
            style: mapStyle,
            center: [location.lng, location.lat],
            zoom: location.zoom,
            minZoom: 8,
            maxZoom: 18,
            attributionControl: false
          }

          let map = new mapboxgl.Map(mapVars as any)
            .on('load', () => {
              map.resize()
              if (geolocation) {
                getStorage('geolocating')
                  .then(geolocating => {
                    if (geolocating === true) {
                      mapOps.geolocator.trigger()
                    } else {
                      mapOps.geolocator.off()
                    }
                  })
              }
            }).on('zoom', () => {
              if (geolocation) mapObj.map.storeLocation(map)
            }).on('move', () => {
              if (geolocation) mapObj.map.storeLocation(map)
            })

          if (geolocation) {
            map.addControl(mapOps.geolocator, 'top-right')
          }

          setMap(map)

        }

      },

      storeLocation: (map: mapboxgl.Map) => {
        let curFocus = { lat: map.getCenter().lat, lng: map.getCenter().lng, zoom: Math.round(map.getZoom()) }
        setStorage('location', curFocus)
      },

      moveToStart: () => {
        // @ts-ignore: Object is possibly 'null'.
        if (map) map.setZoom(main_zoom)
        // @ts-ignore: Object is possibly 'null'.
        if (map && start) map.panTo({ lat: start.lat, lng: start.lng })
      },

    },

    route: {

      load: async (id: string) => {
        mapObj.mapbox.cleanRoute()
        getStorage('route_' + id)
          .then(route => {
            if (route) {
              mapObj.route.getStart(route)
            } else {
              if (geolocation) getStorage('location').then(setStart)
            }
            setRoute(route)
          })
      },

      loadAll: () => {
        for (let route of routes) {
          mapObj.route.set(route)
        }
      },

      getStart: (route: any) => {
        // @ts-ignore: Object is possibly 'null'.
        if (typeof route === 'undefined' || typeof route.places === 'undefined') return
        let place = route.places[0]
        if (typeof place !== 'undefined') {
          let zoom = start?.zoom ?? main_zoom
          let restart = {
            lat: place?.map_data.data.geometry.coordinates[1],
            lng: place?.map_data.data.geometry.coordinates[0],
            zoom: zoom
          }
          setStart(restart)
        }
      },

      jumpToStart: (e: any) => {
        if (!geolocating) {
          setGeolocating(true)
          setStorage('geolocating', true)
          mapOps.geolocator.trigger()
        } else {
          setGeolocating(false)
          setStorage('geolocating', false)
          mapOps.geolocator.off()
          // @ts-ignore: Object is possibly 'null'.
          map.flyTo(start.lat, start.lng, main_zoom - 1)
        }
      },

      set: (route: Route) => {
        try {
          if (!route || !map) return
          launchLoader(t('Loading') ?? 'Loading', loader.timeout / 2, 'dots')
          setTimeout(() => {
            mapObj.route.render(route)
          }, loader.timeout)
        } catch (error) {
          if (testing) console.log('error 236', error)
        }
      },

      render: (route: Route) => {
        mapObj.route.setMarkers(route, '/route/overview/#route_id#/#step#')
        //mapObj.route.setMiddleTitles(route)
        mapObj.route.setPolylines(route)
        mapObj.route.setPolygons(route)
      },

      setMiddleTitles: (route: Route) => {

        try {

          //let el = document.createElement('div')
          //let middleCoords = [];
          //for (let route of routes) {
          //  console.log('routecords', route.map_data.data.geometry.coordinates)
            //let lat = route.map_data.data.geometry.coordinates.lat
            //let lng = route.map_data.data.geometry.coordinates.lng
            //let coordinates = route.map_data.data.geometry.coordinates
            //let middleRoad = Math.floor(coordinates.length / 2)
            //let isTheMiddle =
            //  route.map_data.data.geometry.coordinates[middleRoad][0] !== undefined
            //  && route.map_data.data.geometry.coordinates[middleRoad][1] !== undefined
            //el.style.backgroundImage = 'url("' + apiUrl + icon.icon.url + '")'
            //el.id = 'title_route_' + route.id
            //el.className = 'mapElement icon'
            //el.style.width = `${width}px`
            //el.style.height = `${height}px`
            //el.style.textShadow = '90px 2px'
            // @ts-ignore: Object is possibly 'null'.
            //new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(mapDiv.current)//.setPopup(pop)

          //}
 


        } catch (e) {
          //if (testing) console.log('error 179')
          //setTimeout(() => history.replace('/map/navigate/' + route.id), 1000)
        //  history.go(0)
        }
      },

      setMarkers: (route: Route = { id: 0, places: [], name: '', map_data: { id: 0, data: {} } }, action: string) => {
        try {
          let i = 0
          for (let place of route.places) {
            let coords = [place.map_data.data.geometry.coordinates[1], place.map_data.data.geometry.coordinates[0]]
            let settedAction = action
              .replace('#route_id#', route.id.toString())
              .replace('#step#', (i++).toString())
            mapObj.mapbox.setMarker(
              place.id,
              map,
              coords[0],
              coords[1],
              place.map_marker ?? 4,
              place.name,
              settedAction)
          }
        } catch (error) {
          if (testing) console.log('error 295', error)
          //history.go(0)
          //setTimeout(() => history.replace('/map/navigate/' + route.id), 1000)
        }
      },

      setPolylines: (route: Route = { id: 0, action: '', places: [], name: '', map_data: { id: 0, data: {} } }) => {

        try {

          if (route === null || typeof route.map_data === 'undefined' || typeof map === 'undefined') return

          if (map.getSource('route' + route.id.toString())) return

          map.addSource('route' + route.id, {
            'type': 'geojson',
            'data': {
              'type': 'Feature',
              'properties': {},
              'geometry': {
                'type': 'LineString',
                'coordinates': route.map_data.data.geometry.coordinates
              }
            }
          })

          // @ts-ignore: Object is possibly 'null'.
          map.addLayer({
            'id': route.id.toString(),
            'type': 'line',
            'source': 'route' + route.id,
            'layout': {
              'line-join': 'round',
              'line-cap': 'round'
            },
            'paint': {
              'line-color': route.color,
              'line-width': 5
            }
          })

          // @ts-ignore: Object is possibly 'null'.
          map.on('click', route.id.toString(), () => {
            //launchAlert('You the route: ' + route.name)
          })

          setPolyline({ source: 'route' + route.id, layer: route.id.toString() })

        } catch (e) {
          if (testing) console.log('error 349', e)
          history.go(0)
          //history.replace('/map/navigate/' + route.id)
        }

      },

      setPolygons: (route: Route = { id: 0, action: '', places: [], name: '', map_data: { id: 0, data: {} } }) => {
        if (route === null || typeof route.polygons === 'undefined') return
        for (let polygon of route.polygons) {
          mapObj.mapbox.setPolygon(polygon)
        }
      },

      setPlaceModal: (id: any) => {
        setPlaceId(id)
        //setPlaceModalStatus(true)
      },

      //closePlace: () => setPlaceModalStatus(false),

      WarningRocks: () => {
        present({
          id: Date.now().toString(),
          header: t(translations.rocksHeader) ?? 'Header',
          subHeader: t(translations.rocksSubHeader) ?? 'Subheader',
          message: t(translations.rocksMessage) ?? 'Rocks message',
          buttons: ['OK'],
          keyboardClose: true
        })


      },

    },

    mapbox: {

      setMarker: (placeId: number, map: any, lat: number, lng: number, icon: any, popContent: any, href: string = '') => {
        try {
          let el = document.createElement('div')
          let width = 33
          let height = 43
          getStorage('marker_' + icon)
            .then(icon => {
              el.style.backgroundImage = 'url("' + apiUrl + icon.icon.url + '")'
              el.id = 'marker_' + placeId
              el.className = 'mapElement icon'
              el.style.width = `${width}px`
              el.style.height = `${height}px`

              //el.style.textShadow = '90px 2px'
              el.style.backgroundSize = '100%'
              //let pop = new mapboxgl.Popup({ offset: 25 }).setText(popContent)

              const handleClick = () => {
                mapObj.route.setPlaceModal(placeId.toString());
              };
            
              el.addEventListener('click', handleClick);
              
              new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map)//.setPopup(pop)
            })

        } catch (e) {
          if (testing) console.log('error 404', e)
          history.go(0)
          // @ts-ignore: Object is possibly 'null'.
          //history.replace('/map/navigate/' + route.id)
        }
      },

      setPolygon: (polygon: any) => {

        try {

          // @ts-ignore: Object is possibly 'null'.
          if (map.getSource('maine' + polygon.id.toString())) return

          // @ts-ignore: Object is possibly 'null'.
          map.addSource('maine' + polygon.id, {
            'type': 'geojson',
            'data': {
              'type': 'Feature',
              'properties': {},
              'geometry': {
                'type': 'Polygon',
                'coordinates': polygon.map_data.data.geometry.coordinates
              }
            }
          })

          // @ts-ignore: Object is possibly 'null'.
          map.addLayer({
            'id': 'inside' + polygon.id,
            'type': 'fill',
            'source': 'maine' + polygon.id, // reference the data source
            'layout': {},
            'paint': {
              'fill-color': '#FD4646', // blue color fill
              'fill-opacity': 0.4
            }
          })

          // @ts-ignore: Object is possibly 'null'.
          map.addLayer({
            'id': 'outline' + polygon.id,
            'type': 'line',
            'source': 'maine' + polygon.id,
            'layout': {},
            'paint': {
              'line-color': '#FD4646', // blue color fill
              'line-width': 2
            }
          })

          // @ts-ignore: Object is possibly 'null'.
          map.on('click', 'inside' + polygon.id, () => {
            mapObj.route.WarningRocks()
          }).on('click', 'outline' + polygon.id, () => {
            mapObj.route.WarningRocks()
          })

          mapObj.mapbox.addToPolygons({
            source: 'maine' + polygon.id,
            layer: 'inside' + polygon.id,
            layer2: 'outline' + polygon.id
          })

        } catch (e) {
          if (testing) console.log('error 469',e)
          history.go(0)
          //history.replace('/map/navigate/' + selected)
        }

      },

      addToPolygons: (polygon: any) => {
        let old = polygons
        old.push(polygon)
        setPolygons(old)
      },

      cleanRoute: () => {

        if (!map) return

        document.querySelectorAll('.mapElement').forEach((el: any) => el.remove())

        if (polyline.layer !== '') {
          // @ts-ignore: Object is possibly 'null'. 
          if (map.getLayer(polyline.layer)) {
            map.removeLayer(polyline.layer ?? '').removeSource(polyline.source)
            setPolyline({ source: 'route', layer: '' })
          }
        }

        if (polygons.length > 0) {

          for (let polygon of polygons) {

            //if(document.getElementById(polygons[i].layer)) 
            // @ts-ignore: Object is possibly 'null'.   
            if (map.getLayer(polygon.layer)) {
              // @ts-ignore: Object is possibly 'null'.   
              map.removeLayer(polygon.layer)
              delete polygon.layer
            }

            // @ts-ignore: Object is possibly 'null'.
            if (map.getLayer(polygon.layer2)) {
              // @ts-ignore: Object is possibly 'null'.   
              map.removeLayer(polygon.layer2)
              delete polygon.layer2
              map.removeSource(polygon.source)
            }

            // @ts-ignore: Object is possibly 'null'.
            if (map.getLayer(polygon.source)) {
              // @ts-ignore: Object is possibly 'null'.   
              map.removeSource(polygon.source)
            }

          }

          setPolygons([])

        }

      },

      goToOverview: (routeId: number, routeIndex: number) => history.replace('/route/overview/' + routeId + '/' + routeIndex),

      renderRoutesList: (routes: Route[]) =>
        <>
          <IonGrid id='routes-grid'>
            {routes.map((r: Route, i) => (
              <IonRow key={'routes-list-row' + i} style={{ display: 'in-line', }}>
                <IonCol
                  size='12'
                  style={{
                    verticalAlign: 'middle',
                    fontWeight: 'bold',
                    fontSize: '1.2rem'
                  }}
                  onClick={() => mapObj.mapbox.goToOverview(r.id, 0)}
                >
                  <IonButton className='cursor-pointer ion-text-left' color={r.color} expand="full" style={{ margin: '0', borderRadius: '10px', opacity: '0.6', backgroundColor: r.color }}>
                    <IonLabel slot='start' style={{ fontWeight: 'bold', width: '100%', fontSize: '1.1rem' }}>{r.name}</IonLabel>
                    <IonLabel slot='end'><IonIcon icon={analyticsOutline} /></IonLabel>
                  </IonButton>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </>

    },

  }

  

  const stateChanges = {

    load: () => {
      const ac = new AbortController()
      if (geolocation) {
        getStorage('location')
          .then(location => {
            //setLocation(location)
            mapObj.load(location)
          })
      } else {
        getStorage('center')
          .then(center => {
            //setLocation(center)
            mapObj.load(center)
          })
      }
      return () => ac.abort()
    },

    start: () => {
      const ac = new AbortController()
      if (geolocation) getStorage('selected').then(setSelected)
      mapObj.map.moveToStart()
      return () => ac.abort()
    },

    selected: () => {
      const ac = new AbortController()
      mapObj.route.load(selected)
      return () => ac.abort()
    },

    all: () => {
      const ac = new AbortController()
      mapObj.route.loadAll()
      return () => ac.abort()
    },

    routes: () => {
      const ac = new AbortController()
      if (!geolocation) mapObj.route.loadAll()
      return () => ac.abort()
    },

    urlSelected: () => {
      const ac = new AbortController()
      mapObj.route.load(urlSelected)
      return () => ac.abort()
    },

    route: () => {
      const ac = new AbortController()
      mapObj.route.set(route as any)
      return () => ac.abort()
    }

  }

  useEffect(stateChanges.load, [])
  useEffect(stateChanges.selected, [selected])
  useEffect(()=>setSelected(urlSelected), [urlSelected])
  useEffect(stateChanges.route, [route])
  useEffect(stateChanges.routes, [routes])
  useEffect(stateChanges.start, [start])

  return <IonContent className={scroll? '' : 'no-scroll'}>
    {showSelector && <MapHeader selected={selected} setSelected={setSelected} />}
    <div ref={mapDiv} style={style as any} />
    {!showSelector && mapObj.mapbox.renderRoutesList(routes)}
    {geolocation && <FavBall show={selected !== '0'} style={locatorStyle as any} jumpToStart={mapObj.route.jumpToStart} />}
    {placeId !== '' 
      ? <Place
          id={placeId}
          setPlaceId={setPlaceId}
          pageRef={pageRef}
        />
      : <></>}
    {alert && <Alert {...alert} />}
    {alert && <><IonAlert
    isOpen={true}
        header="Alert"
        subHeader="Important message"
        message="This is an alert!"
        buttons={['OK']}
      ></IonAlert></>}
  </IonContent>

}

export default React.memo(MyMap)