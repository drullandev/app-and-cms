export const MainMenu = [
    {
      name: 'schedule', 
      href: '/tabs/schedule',
      icon: 'calendar',
      label: 'Schedule'
    },
    {
      name: 'speakers', 
      href: '/tabs/speakers',
      icon: 'people',
      label: 'Speakers'
    },
    /*{
      name: 'map', 
      href: '/tabs/map',
      icon: 'location',
      label: 'Map'
    },*/
    {
      name: 'about', 
      href: '/tabs/about',
      icon: 'informationCircle',
      label: 'Speakers'
    }
  ]

  export interface TabProps {
    name: string
    href: string
    icon: string
    label: string
  }