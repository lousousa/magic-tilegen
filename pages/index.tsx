import Head from 'next/head'
import { UIFileInputButton } from '../components/ui/file-input-button'
import axios from 'axios'
import styles from '../styles/Home.module.css'

export default function Home() {
  const onChange = async (body: FormData) => {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (event: any) => {
        console.log(`current progress: ${Math.round((event.loaded * 100) / event.total)}`)
      }
    }

    const { data } = await axios.post('/api/upload', body, config)

    console.log(data)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>✨ Magic Tilegen ✨</title>
        <meta name="description" content="A solution for generate a full combination image tileset, based on a minimal image source" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <UIFileInputButton
          label="upload single file"
          uploadFileName="file"
          onChange={onChange}
        />
      </main>
    </div>
  )
}