import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>✨ Magic Tilegen ✨</title>
        <meta name="description" content="A solution for generate a full combination image tileset, based on a minimal image source" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>welcome</h1>
      </main>
    </div>
  )
}
