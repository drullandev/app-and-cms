import { translations, addToHomeScreenImages } from '../env'

export const addToHomeScreenSettings = () => { 
  return {
    //validLocation: [],
    appId: 'app',
    skipFirstVisit: false,
    //debug: true,
    //activateLogging: true,
    startAutomatically: true,

    lifespan: 120,
    minPageViews: 0,
    startDelay: 0,
    displayPace: 0,
    maxDisplayCount: 0,

    mustShowCustomPrompt: true,
    customPromptContent: {
      splashTitle: translations.splashTitle,
      cancelMsgSplash: translations.cancelMsgSplash,
      installMsgSplash: translations.installMsgSplash,
      guidanceCancelMsgSplash: translations.guidanceCancelMsgSplash,
      src: translations.appIconSplash,
    },

    customPromptPlatformDependencies: {
      iphone: {
        targetUrl: undefined,
        showClasses: ['iphone-wrapper', 'animated', 'fadeIn', 'd-block'],
        images: addToHomeScreenImages,
        action: {
          ok: translations.installMsgSplash,
          cancel: translations.cancelMsgSplash,
          guidanceCancel: translations.guidanceCancelMsgSplash,
        },
      }
    }
  }
}
