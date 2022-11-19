//import * as AppConst from '../../../data/static/constants'
import React from 'react'
import { IonSpinner } from '@ionic/react'

interface Spinner {
  name: "bubbles" | "circles" | "circular" | "crescent" | "dots" | "lines" | "lines-small"
}

const Spinner: React.FC<any> = ({ name = 'circular' }) => (
  <IonSpinner name={name}/>
)

export default Spinner