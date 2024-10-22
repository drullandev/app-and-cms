import React, { useState, useEffect } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonPopover,
  IonList,
  IonItem,
  IonLabel,
  IonSkeletonText,
} from '@ionic/react';
import { filter, shareSocial } from 'ionicons/icons';
import Looper from '../../utils/Looper';

const Header: React.FC<any> = (HeaderProps) => {
  const {
    title,
    showMenuButton = true,
    showSearchBar = false,
    showFilterButton = false,
    showShareButton = false,
    filters = [],
    onFilterChange,
    onShare,
    onSearch,
  } = HeaderProps;

  const [showPopover, setShowPopover] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuLoaded, setMenuLoaded] = useState(false);

  useEffect(() => {
    // Simula un tiempo de carga para el IonMenuButton
    if (showMenuButton) {
      const timer = setTimeout(() => {
        setMenuLoaded(true);
      }, 200); // Ajusta el tiempo según el retraso percibido

      return () => clearTimeout(timer);
    }
  }, [showMenuButton]);

  const handleFilterChange = (filter: string) => {
    if (onFilterChange) {
      onFilterChange(filter);
    }
    setShowPopover(false);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const FilterRow = (filter: any, index: number) => (
    <IonItem button key={index} onClick={() => handleFilterChange(filter)}>
      <IonLabel>{filter}</IonLabel>
    </IonItem>
  )

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
        <div className="menu-transition-wrapper">
          {showMenuButton ? (
            menuLoaded ? (
              <IonMenuButton menu="main" className="menu-button transition-active" />
            ) : (
              <IonSkeletonText
                animated
                className="skeleton transition-active"
                style={{ width: '40px', height: '40px', borderRadius: '23px' }}
              />
            )
          ) : (
            <IonSkeletonText
              animated
              className="skeleton transition-active"
              style={{ width: '40px', height: '40px', borderRadius: '23px' }}
            />
          )}
        </div>
        </IonButtons>
        <IonTitle>{title}</IonTitle>
        <IonButtons slot="end">
          {showFilterButton && (
            <IonButton onClick={() => setShowPopover(true)}>
              <IonIcon slot="icon-only" icon={filter} />
            </IonButton>
          )}
          {showShareButton && onShare && (
            <IonButton onClick={onShare}>
              <IonIcon slot="icon-only" icon={shareSocial} />
            </IonButton>
          )}
        </IonButtons>
      </IonToolbar>

      {showSearchBar && (
        <IonToolbar>
          <IonSearchbar
            value={searchQuery}
            onIonInput={(e: any) => handleSearch((e.target as unknown as HTMLInputElement).value)}
            placeholder="Search"
          />
        </IonToolbar>
      )}

      <IonPopover isOpen={showPopover} onDidDismiss={() => setShowPopover(false)}>
        <IonList>
          <Looper items={filters} renderItem={FilterRow} />
        </IonList>
      </IonPopover>
    </IonHeader>
  );
};

export default React.memo(Header);
