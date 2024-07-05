import { keyTransVar } from '../../public/assets/data/keyTransVar';

export interface KeyTranslations {
  [key: string]: string;
}

class i18nextClass {

  private myTranslations: KeyTranslations | null = null;

  getInstance = () => {
    if (!this.myTranslations) {
      // Realizar la inicialización aquí
      this.myTranslations = keyTransVar
    }
    return this.myTranslations;
  }

}

const i18next = new i18nextClass();

export const keyTrans = i18next.getInstance();