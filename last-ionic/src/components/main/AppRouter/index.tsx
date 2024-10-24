/** 
 * Main routing component for the application.
 * Developed by [Your Name]
 *
 * This component handles the primary routing for the app, including:
 * - The split pane layout for side navigation.
 * - Rendering of routes within the main application structure.
 * - Managing tab navigation when required.
 *
 * Dependencies:
 * - `IonReactRouter` from Ionic: Wraps the app with the necessary router context.
 * - `IonSplitPane` from Ionic: Manages the split pane for side navigation.
 * - `Menu` component: Handles the rendering of side navigation menu items.
 * - `TabItem` component: Manages tab navigation for specific routes.
 *
 * Author: [Your Name]
 */

import React, { useEffect, useState } from 'react';
import { IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Menu from '../Menu';
import RouterOutlet from './components/RouterOutlet';
import { getMenuRoutes, getTabRoutes } from '../../../app/config/routes';
import { IAppRoute, IAppRouter } from './types';

const AppRouter: React.FC<IAppRouter> = ({ id, appRoutes, component }) => {

  // State to hold tab-specific routes, filtered based on app's configuration
  const [tabRoutes, setTabRoutes] = useState<IAppRoute[]>([]);
  const [menuRoutes, setMenuRoutes] = useState<IAppRoute[]>([]);

  // Effect to set tab routes when the component mounts or the route data changes
  useEffect(() => {
    const filteredMenuRoutes = getMenuRoutes();
    setMenuRoutes(filteredMenuRoutes);
  }, [setMenuRoutes]);

  // Effect to set tab routes when the component mounts or the route data changes
  useEffect(() => {
    const filteredTabRoutes = getTabRoutes();
    setTabRoutes(filteredTabRoutes);
  }, [getTabRoutes]);

  return (
    <IonReactRouter>
      <IonSplitPane contentId={id}>

        {/* Render the main router outlet for the application */}
        <RouterOutlet id={id} routes={appRoutes}/>

        {/* Render the side menu if appRoutes are available */}
        {menuRoutes.length > 0 && (
          <Menu id={id} routes={menuRoutes} component={component}/>
        )}

      </IonSplitPane>
    </IonReactRouter>
  );
};

export default React.memo(AppRouter);
