import styled from 'styled-components'

import { MainWrapper } from '../styles'

export const About = () => {
  return <MainWrapper backgroundColor={'grayscale-light'}>
    <Content>
      <h1 className="title-text">
        how it works
      </h1>

      <main className="description">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam molestias, dolorum voluptatum et, amet commodi, fugiat asperiores odio laborum quasi sunt repellendus dolorem voluptates ab pariatur velit cupiditate minima labore!</p>
      </main>

      <h1 className="title-text">
        base tiles
      </h1>
    </Content>
  </MainWrapper>
}

const Content = styled.div`
  h1 {
    text-align: center;
    margin-top: 96px;
    font-size: 40px;
  }

  .description {
    font-size: 18px;
    line-height: 32px;
    margin-top: 96px;
  }
`