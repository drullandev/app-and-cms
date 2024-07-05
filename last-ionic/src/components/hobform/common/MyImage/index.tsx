import React from 'react'

import { LazyLoadImage } from 'react-lazy-load-image-component'


const MyImage = ( root: string | any, image: any ) => (
  <LazyLoadImage
    class='ken-burns'
    alt='Boat image'
    effect='blur'
    threshold={100}
    src={root + image.big.url}
    placeholderSrc={root + image.small.url}
  />
)

export default React.memo(MyImage)