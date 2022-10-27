import React from 'react'
import { IonSpinner } from '@ionic/react'

import Header from './Header'
import Page from '../../../pages/core/Page'

import About from '../../../pages/core/About'
import Account from '../../../pages/core/Account'

import Home from '../../../pages/core/Schedule'
import SpeakerList from '../../extra/MatesList'
import MateDetail from '../../extra/MateDetail'
import MapView from '../../extra/MapView'
import Tutorial from '../../extra/Tutorial'
import Content from './Content'
import Main from './Main'

import { MyComponentProps } from './interfaces/MyComponentProps'

const  testing = false

const MyComponent: React.FC<MyComponentProps> = ({ name, slug, params, content }) => {
  if(testing) console.log('setMyComponent', { name, slug, params, content })
  const returnComponent = (slug: any, jsx: boolean = true) => {
    switch (slug) {
      case 'header': 
        console.log({ name, slug, params, content })        
        return <Header label={params.label} slot={params.slot}/>
      case 'home': return jsx ? <Home /> : Home
      case 'speakers': return <SpeakerList />
      case 'MateDetail': return jsx ? <MateDetail /> : MateDetail
      case 'map': return jsx ? <MapView /> : MapView
      case 'about': return <About />
      case 'tutorial': return <Tutorial/>
      case 'account': return <Account/>
      case 'main': return <Main/>
      case 'content': return <Content row={content}/>
      case 'page': return Page
      default: <IonSpinner name='dots' />
    }
  }
  return (returnComponent(slug))
}

export default MyComponent