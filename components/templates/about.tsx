import styled from 'styled-components'

import { MainWrapper } from '../styles'

export const About = () => {
  return <MainWrapper backgroundColor={'grayscale-light'}>
    <Content>
      <h1>how it works</h1>
    </Content>
  </MainWrapper>
}

const Content = styled.div`
  h1 {
    text-align: center;
  }
`