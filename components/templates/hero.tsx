import axios from 'axios'
import styled from 'styled-components'
import { FC, useState } from 'react'

import { MainWrapper } from '../styles'
import { UIFileInputButton } from '../ui/file-input-button'

export interface IProps {
  uploadProgress: number
  dataUrl: string | null
}

export const Hero = () => {
  const [dataUrl, setDataUrl] = useState<string | null>(null)
  const [tilesetName, setTilesetName] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)

  const onChange = async (body: FormData) => {
    setDataUrl(null)

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (event: any) => {
        setUploadProgress(Math.round((event.loaded * 100) / event.total))

        console.log(Math.round((event.loaded * 100) / event.total))
      }
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
      }
    }
  }

  const MainContent: FC<IProps> = (props) => {
    const shouldShowProgress = props.uploadProgress > 0 && props.uploadProgress < 100

    if (shouldShowProgress) {
      return <span>`${props.uploadProgress}%`</span>
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
    <MainWrapper backgroundColor={'#ddd'}>
      <Content>
        <h1>magic tilegen</h1>

        <main>
          <MainContent
            uploadProgress={uploadProgress}
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
  padding: 88px 0;

  h1 {
    width: 100%;
    text-align: center;
    margin: 0;
    font-size: 68px;
    font-weight: 600;
  }

  main {
    margin-top: 88px;
  }
`

const ButtonDownload = styled.a`
  display: inline-block;
  border: 0;
  background-color: #000;
  color: #fff;
  border-radius: 4px;
  padding: 8px 32px;
  font-size: 24px;
  cursor: pointer;
`