export interface inputGa4 {
  action: string;
  data: {
    category: string, // Categoría del evento (puede ser cualquier nombre relevante)
    action: string, // Acción realizada (por ejemplo, 'Clic en botón')
    label: string, // Etiqueta opcional para detalles adicionales
  }
}

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
  loadingGa4?: inputGa4;
  header?: Function | undefined;
  content: Function;
  footer?: Function | undefined;
  sidenavs?: Function[];
  methods?: Function[];
}