import { GA4Options } from '../../interfaces/GA4';

export interface IonPageProps {
  id: string;
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  animated?: boolean;
  routerDirection?: 'forward' | 'back' | 'root' | string; // Ajusta según las opciones reales de Ionic
  skeleton?: boolean | false;
  ionViewWillEnter?: () => void;
  ionViewDidEnter?: () => void;
  ionViewWillLeave?: () => void;
  ionViewDidLeave?: () => void;
  componentDidLoad?: () => void;
  componentDidUnload?: () => void;
}

export interface PageProps {
  settings: IonPageProps;
  content: Function;
  methods?: Function[];
  ga4?: GA4Options;
  captcha?: boolean | undefined;
  header?: Function | undefined;
  footer?: Function | undefined;
  sidenavs?: Function[];
}