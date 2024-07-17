import React, { useEffect, useMemo, useState } from 'react'
import { IonHeader, IonToolbar, IonImg, IonLabel, IonFab, IonFabButton, IonIcon, IonCol, IonGrid, IonRow, IonSpinner, IonProgressBar } from '@ionic/react'
import { useHistory } from 'react-router'
import { HeaderProps } from './types'

import { translate } from '../../../data/utils/translations'
import { chevronBackOutline } from 'ionicons/icons'
import { apiUrl, homeHref } from '../../../../env'

const Header: React.FC<HeaderProps> = ({ header }) => {

  const history = useHistory()
  const [origin, setOrigin] = useState<string>(homeHref)

  const actions = useMemo(()=>{ 
    return {

    load: () => {
      const ac = new AbortController()
      actions.toggleOrigin()
      return () => ac.abort()
    },

    toggleOrigin: () => {

      let isOverview = ['overview']
      let isTrainYourself = ['the-boat', 'base-departure', 'cruising', 'anchoring', 'base-arrival', 'troubleshooting']
      let isEquipment = ['equipment', 'routes']
      let location = history.location.pathname.split('/')[2]

      if (isOverview.includes(location)) {
        setOrigin('/routes/routes')
      } else if (isEquipment.includes(location)) {
        setOrigin('/menu/home')
      } else if (isTrainYourself.includes(location)) {
        setOrigin('/menu/train-yourself')
      } else {
        setOrigin('/menu/home')
      }

    },

    /*
    filterData: (q: string = '') => {

      setStorage('queryString', q)

      let matchs = []

      if (articles) {

        for (let article of articles) {

          let articleLabel = getTranslations(article.label, 'label', lang)
          article.url = '/article/' + article.slug

          let i = 1
          for (let slide of article.children) {

            let slideDescription = getTranslations(slide.translations, 'description', lang)
            let slideLabel = getTranslations(slide.translations, 'label')
            let fullString =  slide.name + articleLabel + article.name + slideDescription + slideLabel

            if (actions.itMatchs(q, fullString)) {
              slide.label = slide.name
              slide.numTag = + (i + 1) + '/' + article.children.length
              slide.url = '/article/' + article.slug + '/' + i
              slide.description = slideDescription
              matchs.push(slide)
            }
            ++i

          }

        }

        setQResults(matchs as any[])

      }

    },

    itMatchs: (q: string, from: string) => {
      if (from === undefined) return false
      if (!q) return false
      let ql = q.toLowerCase()
      if (ql === from) return true
      if (ql === from) return true
      if (from.toLowerCase().includes(ql)) return true
      return false
    },

    ResultList: (qResults: any) => {
      return <IonList>
        {qResults && qResults.map((row: any, index: number) => {
          return <IonItem key={'search-result-' + row.id + '-' + index}>
            <IonGrid>
              <IonRow >
                <IonCol size='9' className='cursor-pointer' onClick={() => { actions.gotoSelected(row.url) }}>
                  <IonLabel>{row.name}</IonLabel>
                </IonCol>
                <IonCol size='3' className='ion-justify-content-right cursor-pointer' onClick={() => { actions.gotoSelected(row.url) }}>
                  <IonLabel className='numTag'>{row.numTag}</IonLabel>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonItem>
        })}
      </IonList>
    },
    */

    //showSearchModal: () => setShowSearch(true),

    //hideSearchModal: () => setShowSearch(false),

    //getArticles: async () => getStorage('articles').then(setArticles),

    goTo: (origin: string) =>{
       history.replace(origin)
    },
    //getStoredString: () => getStorage('queryString').then(q => { if (q) setQueryString(q) }),

    gotoSelected: (url: string) => {
      //setShowSearch(false)
      setTimeout(() => { history.replace(url) }, 234)
    }
  }

  },[history])

  useEffect(()=>{
    actions.load()
  }, [actions])

  //useEffect(() => {
    //actions.filterData(queryString)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  //}, [queryString])

  return <>
    {header &&
      header.show_header
      ? <IonHeader id='hoh-app-header'>

        <IonToolbar>

          <IonGrid>

            <IonRow className='ion-justify-content-right'>

              {header.show_back &&
                <IonCol size='1' style={{ margin: '1vh 0' }}>
                  {origin
                    ? header.show_back &&
                    <IonIcon
                      icon={chevronBackOutline}
                      size='large'
                      onClick={() => actions.goTo(origin)}
                    />
                    : <IonSpinner name='circles' />}
                </IonCol>}

              <IonCol size='2'>
                <IonImg
                  id='headerIcon'
                  style={{ width: '50px', maxHeight: '3vh' }}
                  src={header.icon ? apiUrl + header.icon.url : ''} alt=''
                />
              </IonCol>

              <IonCol size={header.show_back ? '9' : '10'}>

                <IonRow>
                  <IonCol size='12' id='header-title-container'>
                    <IonLabel id='header-title-label' className='roboto fade-in-2 bold'>
                      {header.label ? translate(header.label, 'label') : ''}
                    </IonLabel>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol id='header-subtitle' size='12' style={{ padding: '0 2%', marginTop: '-1%' }}>
                    <IonLabel id='header-subtitle-label' className='roboto fade-in-2' />
                  </IonCol>
                </IonRow>

              </IonCol>

              {/*header.show_search &&
                <IonCol size='2'
                  className='ion-text-center ion-justify-content-center'
                  style={{ margin: '1vh 0' }}
                  onClick={() => { setShowSearch(true) }}
                >
                  <IonIcon size='large' icon={searchOutline} />
                  <IonModal isOpen={showSearch ?? false}>
                    <IonListHeader >
                      <IonSearchbar
                        showCancelButton="focus"
                        placeholder={t("Search an article...")}
                        onIonChange={(e: CustomEvent) => setQueryString(e.detail.value)}
                        onIonCancel={() => actions.hideSearchModal()}
                        value={queryString}
                      ></IonSearchbar>
                    </IonListHeader>
                    <IonContent>
                      <IonList>
                        {actions.ResultList(queryResult) ?? <IonItem><IonLabel>No results</IonLabel></IonItem>}
                      </IonList>
                    </IonContent>

                  </IonModal>
              </IonCol>*/}

            </IonRow>

          </IonGrid>

          <IonProgressBar
            style={{ display: header.loading ? 'in-line' : 'none' }}
            className={'progress'}
            type='indeterminate'
            reversed={true}
          />

        </IonToolbar>

      </IonHeader>

      : header.show_back

        ? <IonFab onClick={() => actions.goTo(origin)} slot='fixed' style={{ margin: '1vh 0 0 2px' }}>
          <IonFabButton className='backButton' color='white'>
            <IonIcon icon={chevronBackOutline} size='large' />
          </IonFabButton>
        </IonFab>

        : <></> }

  </>

}

export default React.memo(Header)