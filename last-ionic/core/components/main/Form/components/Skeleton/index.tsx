import React from 'react';
import { IonSkeletonText } from '@ionic/react';

const Skeleton: React.FC<{ style?: React.CSSProperties, className?: string }> = ({ style, className }) => {
  return (
    <IonSkeletonText animated style={style} className={className} />
  );
};

export default React.memo(Skeleton);
