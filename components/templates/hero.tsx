import axios from 'axios'
import styled from 'styled-components'
import { FC, useState } from 'react'

import { MainWrapper } from '../styles'
import { UIFileInputButton } from '../ui/file-input-button'

export interface IProps {
  dataUrl: string | null
}

export const Hero = () => {
  const [dataUrl, setDataUrl] = useState<string | null>(null)
  const [tilesetName, setTilesetName] = useState<string | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)

  const onChange = async (body: FormData) => {
    setDataUrl(null)
    setLoading(true)

    const config: any = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }

    const responseUpload = await axios.post('/api/upload', body, config)

    if (responseUpload.data?.success) {
      try {
        const { filepath, filename } = responseUpload.data
        const { data } = await axios.post('/api/generate', { filepath })
        setDataUrl(data.dataUrl)
        setTilesetName(`${filename}-tileset`)
      } catch(err: any) {
        const message = err.response.data.error
        console.log(message)
      } finally {
        setLoading(false)
      }
    }
  }

  const MainContent: FC<IProps> = (props) => {
    if (isLoading) {
      return <LoadingLabel>abracadabra...</LoadingLabel>
    }

    if (props.dataUrl) {
      return <ButtonDownload
        href={props.dataUrl}
        download={`${tilesetName}.png`}
      >
        download
      </ButtonDownload>
    }

    return <UIFileInputButton
      label="upload"
      uploadFileName="file"
      onChange={onChange}
    />
  }

  return (
    <MainWrapper backgroundColor={'grayscale-dark'}>
      <Content>
        <h1>✨ magic tilegen ✨</h1>

        <h2>a <b>magic</b> tileset generator for 2D composition.</h2>

        <main>
          <MainContent
            dataUrl={dataUrl}
          />
        </main>
      </Content>
    </MainWrapper>
  )
}

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  h1 {
    width: 100%;
    text-align: center;
    margin: 96px 0 0;
    font-size: 68px;
    font-weight: 600;
    color: var(--color-grayscale-light);
  }

  h2 {
    width: 100%;
    text-align: center;
    margin: 24px 0 0;
    font-size: 24px;
    font-weight: 400;
    color: var(--color-grayscale-light);
  }

  main {
    margin: 56px 0 116px;
  }
`

const ButtonDownload = styled.a`
  display: inline-block;
  border: 0;
  background-color: var(--color-primary);
  color: var(--color-grayscale-dark);
  border-radius: 4px;
  padding: 8px 32px;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: -4px;
  cursor: pointer;
`

const LoadingLabel = styled.span`
  font-size: 24px;
  line-height: 44px;
  font-weight: 600;
  font-style: italic;
  color: var(--color-primary);
`