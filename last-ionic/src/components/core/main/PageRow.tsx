import React from 'react'
import { IonSpinner } from '@ionic/react'

import Menu from './Menu'
import Form from '../Form/Form'
import MyComponent from './MyComponent'

import { PageRowProps } from './interfaces/PageRowProps'

/**
 * Painting a page row ;)
 * @param param0 
 * @returns 
 */
const testing = false
const PageRow: React.FC<PageRowProps> = ({ menu, component, content }) => {
  if(testing) console.log('PageRowProps', { menu, component})
  const returnComponent = () => {
    if (!component) return
    return component && 
    <MyComponent
      name={component.name}
      slug={component.slug}
      content={content}
    />
  }

  return (
    <>
      {/*menu ? <Menu {...menu} /> :
        form ? <Form {...form} /> :
          content ? returnComponent() :
            component ? returnComponent()
  : <IonSpinner name='dots' />*/}
    </>
  )

}

export default PageRow