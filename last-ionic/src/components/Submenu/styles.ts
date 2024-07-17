import styled from 'styled-components'

import { SubMenuItemProps } from './types'

interface Algo {
    justify: string
}

export const SubMenuList = styled.div<Algo>`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: ${p => p.justify ?? 'space-evenly'};
    align-items: center;
`

export const SubMenuItem = styled.div<SubMenuItemProps>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`