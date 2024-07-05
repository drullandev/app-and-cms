import React from 'react';
import { IonItem, IonLabel, IonSkeletonText } from '@ionic/react';
import { SkeletonProps } from './types';

const Skeleton: React.FC<SkeletonProps> = ({
  style = {},
  lines = 'none'
}) => {
  return (
    <IonItem lines={lines}>
      <IonLabel>
        <IonSkeletonText animated style={{ ...style }} />
      </IonLabel>
    </IonItem>
  );
};

export default Skeleton;