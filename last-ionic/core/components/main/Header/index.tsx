import React from 'react';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonButton, IonIcon, IonSearchbar, IonPopover, IonList, IonItem, IonLabel, IonMenuToggle } from '@ionic/react';
import { filter, shareSocial } from 'ionicons/icons';

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

  const [showPopover, setShowPopover] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

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

  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          {showMenuButton && <IonMenuButton menu="main" />}
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
      <IonPopover
        isOpen={showPopover}
        onDidDismiss={() => setShowPopover(false)}
      >
        <IonList>
          {filters.map((filter: any, index: number) => (
            <IonItem button key={index} onClick={() => handleFilterChange(filter)}>
              <IonLabel>{filter}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonPopover>
    </IonHeader>
  );
};

export default Header;
