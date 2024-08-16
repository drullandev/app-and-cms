import { keyTransVar } from '../../static/data/keyTransVar';
import DebugUtil from './DebugUtil';
import i18n from 'i18next';

export interface KeyTranslations {
  [key: string]: string;
}

class i18nextClass {
  private myTranslations: KeyTranslations | null = null;
  private debug = DebugUtil.setDebug(true);

  getInstance = (): KeyTranslations => {
    if (!this.myTranslations) {
      // Realizar la inicialización aquí
      this.myTranslations = keyTransVar;
    }
    return this.myTranslations;
  };

  public translate(key: string): string {
    // Asegurarse de que myTranslations no es null
    if (this.myTranslations === null) {
      this.getInstance(); // Inicializar si es necesario
    }
    
    return this.myTranslations![key] || key; // Usar el operador de aserción no nulo
  }
}

const i18next = new i18nextClass();
export const keyTrans = i18next.getInstance();
