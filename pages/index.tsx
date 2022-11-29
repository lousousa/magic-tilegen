import Head from 'next/head'

import { Hero } from '../components/templates/hero'

export default function Home() {
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
    <div>
      <Head>
        <title>✨ Magic Tilegen ✨</title>
        <meta name="description" content="A solution for generate a full combination image tileset, based on a minimal image source" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
    </div>
  )
}