import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import { Data } from './../utils/types'

export default function Home() {
  const [data, setData] = useState<Data | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      const data = await (await fetch('/api/generate')).json()

      if (isLoading) {
        setData(data)
      }
    }

    fetchData().catch(console.error)

    return () => setLoading(false)
  })

  return (
    <div className={styles.container}>
      <Head>
        <title>✨ Magic Tilegen ✨</title>
        <meta name="description" content="A solution for generate a full combination image tileset, based on a minimal image source" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {data && <img src={data.dataUrl}/>}
      </main>
    </div>
  )
}
