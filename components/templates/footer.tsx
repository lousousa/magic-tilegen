import styled from 'styled-components'
import { MainWrapper } from '../styles'

export const Footer = () => {
  return (
    <MainWrapper backgroundColor={'grayscale-dark'}>
      <Content>
        <h3>developed by <a href="https://github.com/lousousa" target="_blank">@lousousa</a> - 2022</h3>
      </Content>
    </MainWrapper>
  )
}

const Content = styled.div`
  padding: 96px 0;
  color: var(--color-grayscale-light);
  font-size: 16px;

  h3 {
    font-weight: 400;
    margin: 0;
  }

  a {
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`