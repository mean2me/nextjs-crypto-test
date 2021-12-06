import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import AppLoader from '../components/DataLoader'

export default function Home() {
  return (
    <div className="flex h-screen w-screen m-0 bg-white">
      <Head>
        <title>Crypto test</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="flex flex-row w-screen h-screen">
        <AppLoader />
      </main>
    </div>
  )
}
