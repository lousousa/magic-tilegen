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
        <ImageWrapper>
          <Image
            src="/assets/images/2-full.png"
            alt="source image"
            objectFit="contain"
            fill
          />
        </ImageWrapper>

        <IconWrapper>
          <Image
            src="/assets/icons/arrow-right.svg"
            alt="source image"
            objectFit="contain"
            fill
          />
        </IconWrapper>

        <ImageWrapper>
          <Image
            src="/assets/images/2-full-tileset.png"
            alt="source image"
            objectFit="contain"
            fill
          />
        </ImageWrapper>
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
  padding: 0 166px;

  div {
    flex: 1;
  }
`

const ImageWrapper = styled.div`
  position: relative;
  height: 200px;
  max-width: 160px;
`

const IconWrapper = styled.div`
  position: relative;
  height: 20px;
`