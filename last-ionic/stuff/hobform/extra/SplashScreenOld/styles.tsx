import styled from 'styled-components'

export const ConMiddle = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background-color: #fffdf4;
`

export const Middle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const SplashLabel = styled.label`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 2.4rem;
    margin: 1rem;
    font-weight: bold;
    font-style: italic;
    color: black;
`

export const SplashProgress = styled.div`
  margin: 4rem 0 0 0;
`

export const Loader = {  
  width: '80%',
  margin: '2vh 50%',
  height: '5px',
  transform: 'translate(-50%, -50%)',
  transition: 'all 2st ease-in-out',
  borderRadius: '6px',
  opacity: '0.4'  
}