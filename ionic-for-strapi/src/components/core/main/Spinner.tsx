import * as AppConst from '../../../static/constants'
import React from 'react'
import { IonSpinner } from '@ionic/react'

interface Spinner {
  name: "bubbles" | "circles" | "circular" | "crescent" | "dots" | "lines" | "lines-small"
}

const Spinner: React.FC<SpinnerProps> = ({ name = 'circular' }) => (
  <IonSpinner name={name}/>
)

export default Spinner