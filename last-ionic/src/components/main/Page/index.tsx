import React, { useEffect, useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { Helmet } from 'react-helmet';

import LoggerUtils from '../../../classes/utils/LoggerUtils';
import './styles.css';
import { GA4Options } from './types';
import useGA4Tracker from '../../../integrations/useGA4Tracker';
import { getTabRoutes } from '../../../app/config/routes'; 
import { IAppRoute } from '../AppRouter/types';
import TabItem from '../Menu/TabItem';

export interface IonPageProps {
  id: string;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  animated?: boolean;
  routerDirection?: 'forward' | 'back' | 'root' | string; 
  skeleton?: boolean | false;
  title: string;
  role: string;
  description: string;
  ionViewWillEnter?: () => void;
  ionViewDidEnter?: () => void;
  ionViewWillLeave?: () => void;
  ionViewDidLeave?: () => void;
  componentDidLoad?: () => void;
  componentDidUnload?: () => void;
}

export interface IPage {
  settings: IonPageProps;
  content: Function;
  methods?: any[];
  ga4?: GA4Options;
  captcha?: boolean | undefined;
  header?: Function | undefined;
  footer?: Function | undefined;
  sidenavs?: Function[];
}

const Page: React.FC<IPage> = (pageProps) => {

  const debug = false;
  const logger = LoggerUtils.getInstance('Page', debug);
  const [tabRoutes, setTabRoutes] = useState<IAppRoute[]>([]);  // Mantenemos las rutas en el estado local

  useEffect(() => {
    logger.info(' • Loading page!');
    useGA4Tracker.sendEvent('load', pageProps.ga4);

    // Filtrar y establecer las rutas de pestañas
    const filteredTabRoutes = getTabRoutes();
    setTabRoutes(filteredTabRoutes);
  }, [pageProps]);

  return (
    <IonPage {...pageProps.settings}>
      <Helmet>
        <title>{import.meta.env.VITE_APP_NAME + ' - ' + pageProps.settings.title}</title>
        <meta name="description" content="This is a brief description of the page content." />
      </Helmet>

      {pageProps.header !== undefined && pageProps.header(pageProps)}

      <IonContent>
        {pageProps.content(pageProps)}
      </IonContent>

      {pageProps.footer !== undefined && pageProps.footer(pageProps)}

              {/* Render the tab navigation at the bottom if tab routes are available */}
              {/*tabRoutes.length > 0 &&
          <TabItem id="main-tabs" routes={tabRoutes} />
  */}

    </IonPage>
  );
};

export default React.memo(Page);
