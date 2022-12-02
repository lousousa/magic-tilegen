import styled from 'styled-components'
import Image from 'next/image'

import { MainWrapper } from '../styles'

export const About = () => {
  const previewData = [
    {
      title: 'base tiles',
      templates: [ '2-full', '3-top', '3-full' ]
    },
    {
      title: 'internal corners',
      templates: [ '2-internal-corners', '3-internal-corners' ]
    }
  ]

  const previewSection = previewData.map((data, idx) => {
    const templatesPreview = data.templates.map((template, idx) => {
      return (
        <PreviewWrapper key={`preview_wrapper_${idx}`}>
          <ImageWrapper>
            <Image
              src={`/assets/images/${template}.png`}
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
              src={`/assets/images/${template}-tileset.png`}
              alt="source image"
              objectFit="contain"
              fill
            />
          </ImageWrapper>
        </PreviewWrapper>
      )
    })

    return [
      <TextTitle key={`text_title_${idx}`}>
        {data.title}
      </TextTitle>,

      templatesPreview
    ]
  })

  return (
    <MainWrapper backgroundColor={'grayscale-light'}>
      <Content>
        <TextTitle>
          how it works
        </TextTitle>

        <DescriptionWrapper>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam molestias, dolorum voluptatum et, amet commodi, fugiat asperiores odio laborum quasi sunt repellendus dolorem voluptates ab pariatur velit cupiditate minima labore!</p>
        </DescriptionWrapper>

        {previewSection}
      </Content>
    </MainWrapper>
  )
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
  padding: 0 96px;

  div {
    flex: 1;
  }
`

const ImageWrapper = styled.div`
  position: relative;
  height: 200px;
  max-width: 200px;
`

const IconWrapper = styled.div`
  position: relative;
  height: 104px;
`