import { RouteComponentProps } from "react-router-dom";

export interface IAppRoute {
    title: string;
    path?: string;
    icon: string;
    component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    logged: boolean;
    menu: boolean;
    exact?: boolean;
    redirect?: boolean;
    from?: string;
    to?: string;
    tab?: boolean;
    isHome?: boolean;
    groups: string[]
  }
  
  export interface IAppRouter {
    id: string;
    appRoutes: IAppRoute[];
    component: React.ComponentType<{ route: IAppRoute }>; // Aseguramos que se espera un componente que reciba 'route' como prop
  }
  