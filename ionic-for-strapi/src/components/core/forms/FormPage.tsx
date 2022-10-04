import * as AppConst from '../../../static/constants'
import React, { useEffect, useState } from 'react'
import { IonContent, IonFooter, IonSpinner, getConfig } from '@ionic/react'
import { useLocation, useHistory } from 'react-router-dom'
//import { RouteComponentProps } from 'react-router'
import { restGet } from '../../../data/utils/rest/rest.utils'
import { connect } from '../../../data/connect'
import PageRow from '../main/PageRow'

// TODO: TEMPORARY STYLES...
import '../../../styles/MapView.scss'
import '../../../styles/Home.scss'
import '../../../styles/SpeakerList.scss'

export interface PageProps {
  slug: string
}

export interface StateProps {
  mode: 'ios' | 'md'
}

const FormPage: React.FC<PageProps> = ({ slug }) => {

  //const [page, setPage] = useState<PageProps>()
  const [slugIn, setSlugIn] = useState('')
  const [pageRows, setPageRows] = useState([])

  useEffect(() => {
    console.log('Load FormPage:', slug)
    restGet('pages', { slug : slug})
    .then(res => {
      setSlugIn(res.data[0].slug)
      if (typeof res.data[0].rows !== 'undefined') setPageRows(res.data[0].rows)
    }).catch(res=>{

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

  return <IonContent id={slugIn+'-page'}>
    {setArea('header')}
    {setArea('content')}
    {setArea('footer')}
  </IonContent>

}

export default connect<PageProps>({

  mapStateToProps: (state) => ({
    mode: getConfig()!.get('mode'),
  }),

  mapDispatchToProps: { },

  component: FormPage

})