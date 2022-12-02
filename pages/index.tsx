import Head from 'next/head'

import { Hero } from '../components/templates/hero'
import { About } from '../components/templates/about'
import { Footer } from '../components/templates/footer'

export default function Home() {
  return (
    <div>
      <Head>
        <title>✨ Magic Tilegen ✨</title>
        <meta name="description" content="A solution for generate a full combination image tileset, based on a minimal image source" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />

      <About />

      <Footer />
    </div>
  )
}