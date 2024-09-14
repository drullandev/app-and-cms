import React, { useEffect, useState } from 'react';
import { IonItem, IonLabel, IonSpinner } from '@ionic/react';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import useUserStore from '../../classes/stores/user.store'; // Importa tu store de Zustand

export interface PathProps {
  slug?: string
  value: string
  component: {
    name?: string
    icon?: string
    iconOut?: string
    exact?: false
    main?: false
    icon_out?: string
    component: {
      name?: string
      slug?: string
      params?: object
    }
  },
  roles: {
    name?: string
    type?: string
  }[]
}
export interface MenuRowProps {
  row: {
    title: string
    component: {
      component: {
        id: number
      }
      icon: string
    }
    slug: string
    path: PathProps
  }
}

// Style
import './styles/Menu.css';
import Icon from '../Icon';

const MenuRow: React.FC<MenuRowProps> = ({ row }) => {
  const history = useHistory();
  const location = useLocation();
  const [path, setPath] = useState<PathProps>();
  const [menuClass, setMenuClass] = useState('');
  const [icon, setIcon] = useState('');

  const isLoggedIn = useUserStore((state: any) => state.isLoggedIn); // Usando Zustand para acceder a `isLoggedIn`

  useEffect(() => {
    if (row.path && row.path.slug) {
      /*
      restGet('paths', { slug: row.path.slug })
        .then(res => {
          var data = res.data[0];
          // An access page without roles are skipped
          if (!isAuth(data.roles)) return;

          setPath(data);

          if (data.component.icon !== undefined){
            setIcon(data.component.icon ? data.component.icon : 'person');
          }

          var selected = location.pathname.startsWith(data.value)
            || location.pathname.startsWith('/tabs' + data.value);
          setMenuClass(selected ? 'selected' : '');

        })
        .catch(err => { console.log(err) })
        */
    }
    
    // eslint-disable-next-line
  }, [location.pathname, row.path]);

  function isAuth(roles: any) {
    if (roles.length === 1) {
      if (roles[0].type === 'public' && !isLoggedIn) {
        return true;
      } else if (roles[0].type === 'authenticated' && isLoggedIn) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  return path ? (
    <IonItem
      key={path.slug}
      button
      className={menuClass}
      onClick={() => {
        history.push(path.value);
      }}
    >
      <Icon slot={'start'} name={icon} />
      <IonLabel>{row.title}</IonLabel>
    </IonItem>
  ) : (
    <IonSpinner name="dots" />
  );
};

export default MenuRow;
