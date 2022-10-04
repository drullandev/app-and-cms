import * as AppConst from '../static/constants'
import React from 'react'
import { gql, useQuery } from '@apollo/client'

interface PopoverProps {
  dismiss: () => void
}


const Settings: React.FC<PopoverProps> = ({ dismiss }) => {

  const close = (url: string) => {
    window.open(url, '_blank')
    dismiss()
  }

  const { loading, error, data } = useQuery(gql`
    query Settings {
      settings {
        id          
      }
    }
  `);

  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`;

  return (
    <>
      {data.map((setting: any) => (
        console.log(setting)
      ))}
    </>
  )
}

export default Settings