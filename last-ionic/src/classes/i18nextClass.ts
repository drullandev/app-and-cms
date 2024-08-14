import { keyTransVar } from '../../public/assets/data/keyTransVar';
import DebugUtil from './DebugUtil'
import i18n from 'i18next';
export interface KeyTranslations {
  [key: string]: string;
}

class i18nextClass {

  private myTranslations: KeyTranslations | null = null;

  private debug = DebugUtil.setDebug(true)

  getInstance = () => {
    if (!this.myTranslations) {
      // Realizar la inicialización aquí
      this.myTranslations = keyTransVar
    }
    return this.myTranslations;
  }

  public translate(key: string): string {
    return this.myTranslations[key] || key;
  }

}

const i18next = new i18nextClass();

export const keyTrans = i18next.getInstance();