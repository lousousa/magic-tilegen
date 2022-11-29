import styled from 'styled-components'

export const MainWrapper = styled.div<{backgroundColor: string}>`
  display: flex;
  justify-content: center;
  padding: 0 20px;
  background-color: ${props => props.backgroundColor};

  > div {
    max-width: 1080px;
  }
`