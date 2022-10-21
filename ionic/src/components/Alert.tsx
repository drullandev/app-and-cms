import { useIonAlert } from '@ionic/react'

const Alert = (data: any) => {
  const [presentAlert] = useIonAlert()
  return presentAlert(data)
}

export default Alert

/*{
    header: 'Please enter your info',
    buttons: ['OK'],
    inputs: [
        {
            placeholder: 'Name',
        },
        {
            placeholder: 'Nickname (max 8 characters)',
            attributes: {
            maxlength: 8,
            },
        },
        {
            type: 'number',
            placeholder: 'Age',
            min: 1,
            max: 100,
        },
        {
            type: 'textarea',
            placeholder: 'A little about yourself',
        },
    ],
}*/