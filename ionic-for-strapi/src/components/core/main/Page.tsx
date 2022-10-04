import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router'
import { IonPage, IonHeader, IonContent, IonFooter, IonSpinner } from '@ionic/react'
import { useLocation } from 'react-router-dom'

import { restGet } from '../../../data/utils/strapi/strapi.calls'

import PageRow from './PageRow'

import '../styles/About.scss'

export interface PageProps extends RouteComponentProps<{ slug: string, id?: string }> {
  slug: string
  id?: string
}

const Page: React.FC<PageProps> = ({ match }) => {

  const location = useLocation()
  const testing = false

  //const [page, setPage] = useState<PageProps>()
  const [slugIn, setSlugIn] = useState('')
  const [pageRows, setPageRows] = useState([])

  useEffect(() => {
    restGet('pages', { slug: match.params.slug })
      .then(res => {
        if(testing) console.log('Recovered page', res.data)
        setSlugIn(res.data[0].slug)
        if (typeof res.data[0].rows !== 'undefined') setPageRows(res.data[0].rows)
      })
  }, [match.params.slug])

  const setArea = (type: string) => {
    return pageRows ? pageRows.map((row: any, i: number) => (
      row.section === type && getPageRow(row, i)
    )) : <IonSpinner name='dots' />
  }

  const getPageRow = (row: any, i: number) => (
    <PageRow key={i} menu={row.menu} form={row.form} component={row.component} />
  )

  return (
    <IonPage id={slugIn}>
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

export default React.memo(Page)