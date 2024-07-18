import React from 'react'

import { useIonToast } from '@ionic/react'
import { useTranslation } from 'react-i18next'



import { connect } from '../../reducer/src/connect'

import '../../styles/index.scss'

import { PageProps } from '../../components/Page/types'
import Form from '../../components/Form'
import Page from '../../components/Page'
import Header from '../../components/main/Header'
import { recover } from './source';

// Component Reducer
import { OwnProps, ComponentProps, StateProps, DispatchProps, mapStateToProps, mapDispatchToProps } from './reducer'

const Recover: React.FC<ComponentProps> = ({
  setisLogged,
  history,
}) => {

  const { t } = useTranslation()
  const [presentToast] = useIonToast()
 
  const pageSettings: PageProps = {
    settings:{
      id: 'recover-page',
    },
    header: ()=> <Header label={"Recover"} slot="start"/>,
    content: ()=>{//Remember, you are in a content yet
      return <>
          <Form {...recover()} />
      </>
    },
    footer: ()=>{
      return <></>
    }

  }

  return <Page {...pageSettings}/>

}

export default connect<OwnProps, StateProps, DispatchProps>({ mapStateToProps, mapDispatchToProps, component: Recover });