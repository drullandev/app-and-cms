import React, { useMemo } from 'react';
import { IonMenuToggle, IonIcon, IonItem, IonLabel } from '@ionic/react';

export interface ListRowProps {
  id: number
  title?: string
  name?: string
  path: string
  slot?: string
  icon?: string
}

export interface ListProps {
  rows: ListRowProps[]
  id: number
  title: string
  path?: string
}

const List: React.FC<ListProps> = ({ rows }) => {
  // Memoize the current path to avoid recalculating in each render
  const currentPath = useMemo(() => window.location.pathname, []);

  return (
    <>
      {rows.map((row: ListRowProps) => (
        <IonMenuToggle key={row.title} auto-hide="false">
          <IonItem
            key={row.title}
            detail={false}
            routerLink={row.path}
            routerDirection="none"
            className={currentPath.startsWith(row.path) ? 'selected' : undefined}
          >
            <IonIcon slot={row.slot} icon={row.icon} />
            <IonLabel>{row.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ))}
    </>
  );
};

export default List;
