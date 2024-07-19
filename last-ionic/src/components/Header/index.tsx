import React from 'react';
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
} from '@ionic/react';
import { filter, shareSocial, menu } from 'ionicons/icons';

interface CustomHeaderProps {
  title: string;
  showMenuButton?: boolean;
  showSearchBar?: boolean;
  showFilterButton?: boolean;
  showShareButton?: boolean;
  filters?: string[];
  onFilterChange?: (filter: string) => void;
  onShare?: () => void;
  onSearch?: (query: string) => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title,
  showMenuButton = true,
  showSearchBar = true,
  showFilterButton = true,
  showShareButton = true,
  filters = [],
  onFilterChange,
  onShare,
  onSearch,
}) => {
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
          {showMenuButton && <IonMenuButton />}
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
            onIonInput={(e) => handleSearch((e.target as unknown as HTMLInputElement).value)}
            placeholder="Search"
          />
        </IonToolbar>
      )}
      <IonPopover
        isOpen={showPopover}
        onDidDismiss={() => setShowPopover(false)}
      >
        <IonList>
          {filters.map((filter, index) => (
            <IonItem button key={index} onClick={() => handleFilterChange(filter)}>
              <IonLabel>{filter}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonPopover>
    </IonHeader>
  );
};

export default CustomHeader;
