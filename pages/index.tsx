import Head from 'next/head'

import { Hero } from '../components/templates/hero'

export default function Home() {
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