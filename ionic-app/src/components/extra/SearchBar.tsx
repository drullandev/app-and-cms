import React from 'react'
import { IonSearchbar } from '@ionic/react'

const SearchBar: React.FC = () => {

  const searchString = 'Search string'

  function setSearchString(text: string) {
    console.log(text)
  }

  return (
    <IonSearchbar value={searchString} onIonChange={e => setSearchString(e.detail.value!)}></IonSearchbar>
  )
}

export default SearchBar