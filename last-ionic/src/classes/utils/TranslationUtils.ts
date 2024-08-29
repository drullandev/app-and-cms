import { keyTransVar } from '../../static/data/keyTransVar';
import DebugUtils from './DebugUtils';
import i18n from 'i18next';

export interface KeyTranslations {
  [key: string]: string;
}

class TranslationUtils {

  private myTranslations: KeyTranslations | null = null;
  private debug = DebugUtils.setDebug(true);

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

const i18next = new TranslationUtils();

export const keyTrans = i18next.getInstance();
