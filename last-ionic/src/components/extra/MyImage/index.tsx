import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface ImageProps {
  root: string;
  image: {
    big: { url: string };
    small: { url: string };
  };
}

const MyImage: React.FC<ImageProps> = ({ root, image }) => (
  <LazyLoadImage
    className='ken-burns' // Cambia 'class' a 'className'
    alt='Boat image'
    effect='blur'
    threshold={100}
    src={root + image.big.url}
    placeholderSrc={root + image.small.url}
  />
);

export default React.memo(MyImage);
