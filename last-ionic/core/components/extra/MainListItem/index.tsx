import React, { useRef, useEffect, useState } from 'react';
import { IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonSkeletonText, IonThumbnail } from '@ionic/react';
import useSessionStore from '../../../classes/stores/app.store';
import Icon from '../Icon';
export interface ListRowProps {
  id: number
  title?: string
  name?: string
  path: string
  slot?: string
  icon?: string
}
import useSearchStore from '../../../classes/stores/searcher.store'; // Import the new search store

interface LineProps {
  id: string;
  content: string;
  created_at: string;
  published_at: string;
}

interface OwnProps {
  row: ListRowProps;
}

const MainListItem: React.FC<OwnProps> = ({ row }) => {
  const [line, setLine] = useState<LineProps | undefined>(undefined);
  const ionItemSlidingRef = useRef<HTMLIonItemSlidingElement>(null);
  const { searchString } = useSearchStore();

  // Simula una llamada para obtener datos. Reemplaza esto con tu lógica real.
  useEffect(() => {
    /*restGet('user-contents', { id: row.id })
    .then(res => {
      if (res.status === 200) {
        setLine(res.data[0]);
      }
    }).catch(err => {
      console.log(err);
    });
    */
  }, [row?.id, searchString]);

  const dismissAlert = () => {
    ionItemSlidingRef.current && ionItemSlidingRef.current.close();
  };

  const removeLine = () => {
    console.log('You pretend to remove this from the list or including from the database ^^');
  };

  const putTimeline = (line: LineProps) => {
    return <p>{line.created_at}&mdash;&nbsp;{line.published_at}&mdash;&nbsp;{line.published_at}</p>;
  };

  const putContent = (line: LineProps) => {
    return <h3>{line.id + ' - ' + line.content}</h3>;
  };

  return line ? (
    <IonItemSliding ref={ionItemSlidingRef} className={'track-' + row.id}>
      <IonItem routerLink={`/tabs/list/asdfasdfas/${line.id}`}>
        <IonLabel>
          {putContent(line)}
          {putTimeline(line)}
        </IonLabel>
      </IonItem>
      <IonItemOptions>
        <IonItemOption color="danger" onClick={() => removeLine()}>
          <Icon slot='' name='trashoutline' />
        </IonItemOption>
        <IonItemOption color="favorite" onClick={() => console.log('Favorite clicked')}>
          <Icon slot='' name='staroutline' />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  ) : (
    <IonItem>
      <IonThumbnail slot="start">
        <IonSkeletonText animated />
      </IonThumbnail>
      <IonLabel>
        <h3><IonSkeletonText animated style={{ width: '50%' }} /></h3>
        <p><IonSkeletonText animated style={{ width: '80%' }} /></p>
        <p><IonSkeletonText animated style={{ width: '60%' }} /></p>
      </IonLabel>
    </IonItem>
  );
};

export default MainListItem;
