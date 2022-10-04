import * as AppConst from '../../../static/constants'
import React, { useEffect, useState } from 'react'
import { IonPage, IonHeader, IonContent, IonFooter, getConfig, IonSpinner } from '@ionic/react'
import { useLocation, useHistory } from 'react-router-dom'
//import { RouteComponentProps } from 'react-router'
import { restGet } from '../../../data/utils/rest/rest.utils'
import { connect } from '../../../data/connect'
import PageRow from '../../../components/core/main/PageRow'

// TODO: TEMPORARY STYLES...
import '../../../styles/MapView.scss'
import '../../../styles/Home.scss'
import '../../../styles/SpeakerList.scss'

export interface PageProps {
  slug: string
  id?:string
}

export interface StateProps {
  mode: 'ios' | 'md'
}

const PageSet: React.FC<PageProps> = ({ slug, id }) => {

  const location = useLocation()
  const history = useHistory()

  //const [page, setPage] = useState<PageProps>()
  const [slugIn, setSlugIn] = useState('')
  const [pageRows, setPageRows] = useState([])
  const [showMainTab, setShowMainTab] = useState(false)

  useEffect(() => {
    console.log('Load Page', slug)
    restGet('pages', { slug : slug})
    .then(res => {
      setSlugIn(res.data[0].slug)
      setShowMainTab(res.data[0].show_main_tab)
      if (typeof res.data[0].rows !== 'undefined') setPageRows(res.data[0].rows)
    }).catch(res=>{
      restGet('pages', { slug : '404'})
      .then(res2 => {
        setSlugIn(res2.data[0].slug)
        setShowMainTab(res2.data[0].show_main_tab)
        if (typeof res2.data[0].rows !== 'undefined') setPageRows(res2.data[0].rows)
      })
      setTimeout(()=>{
        history.push(AppConst.HOME)
      }, AppConst.timeout.redirect)
    })
  }, [slug])

  const setArea = (type: string) => {
    return pageRows ? pageRows.map((row: any, i: number) => (
      row.section === type && getPageRow(row, i)
    )) : <IonSpinner name='dots' />
  }

  const getPageRow = (row: any, i: number) => (
    <PageRow key={i} menu={row.menu} form={row.form} component={row.component} content={row.content} />
  )

  return (
    <IonPage id={slugIn+'-page'}>
      <IonHeader>
        {setArea('header')}
      </IonHeader>
      <IonContent>
        {setArea('content')}
      </IonContent>
      <IonFooter>
        {setArea('footer')}
      </IonFooter>
    </IonPage>
  )

}

export default connect<PageProps>({

  mapStateToProps: (state) => ({
    mode: getConfig()!.get('mode'),
  }),

  mapDispatchToProps: {},

  component: PageSet

})