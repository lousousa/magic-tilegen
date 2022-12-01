import styled from 'styled-components'
import Image from 'next/image'

import { MainWrapper } from '../styles'

export const About = () => {
  return <MainWrapper backgroundColor={'grayscale-light'}>
    <Content>
      <TextTitle>
        how it works
      </TextTitle>

      <DescriptionWrapper>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam molestias, dolorum voluptatum et, amet commodi, fugiat asperiores odio laborum quasi sunt repellendus dolorem voluptates ab pariatur velit cupiditate minima labore!</p>
      </DescriptionWrapper>

      <TextTitle>
        base tiles
      </TextTitle>

      <PreviewWrapper>
        <div>
          <Image
            src="/../public/assets/images/2-full.png"
            alt="source image"
            fill
          />
        </div>

        <div>
          arrow
        </div>

        <div>
          <Image
            src="/../public/assets/images/2-full-tileset.png"
            alt="source image"
            fill
          />
        </div>
      </PreviewWrapper>
    </Content>
  </MainWrapper>
}

const Content = styled.div`
  padding-bottom: 96px;
`

const TextTitle = styled.h1`
  text-align: center;
  margin-top: 96px;
  font-size: 40px;
`

const DescriptionWrapper = styled.div`
  font-size: 18px;
  line-height: 32px;
  margin-top: 96px;
`

const PreviewWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 96px;

  div {
    flex: 1;
    text-align: center;
  }
`
