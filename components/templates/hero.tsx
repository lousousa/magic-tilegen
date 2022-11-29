import axios from 'axios'
import styled from 'styled-components'
import { useState } from 'react'

import { MainWrapper } from '../styles'
import { UIFileInputButton } from '../ui/file-input-button'

export const Hero = () => {
  const [dataUrl, setDataUrl] = useState<string | null>(null)

  const onChange = async (body: FormData) => {
    setDataUrl(null)

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (event: any) => {
        console.log(`current progress: ${Math.round((event.loaded * 100) / event.total)}`)
      }
    }

    const responseUpload = await axios.post('/api/upload', body, config)

    if (responseUpload.data?.success) {
      try {
        const { data } = await axios.post('/api/generate', { filePath: responseUpload.data.filepath })
        setDataUrl(data.dataUrl)
      } catch(err: any) {
        const message = err.response.data.error
        console.log(message)
      }
    }
  }

  return (
    <MainWrapper backgroundColor={'#ddd'}>
      <Content>
        <h1>magic tilegen</h1>

        <main>
          <UIFileInputButton
            label="upload"
            uploadFileName="file"
            onChange={onChange}
          />

          {dataUrl && <img src={dataUrl}/>}
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