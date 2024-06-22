'use client'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import Map from './components/map'
export default () => {
  let map: any
  const [data, setData] = useState('')

  useEffect(() => {
    fetch(
      `https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6`
    )
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [])
  return (
    <main className="flex h-[100vh] flex-col items-center justify-center ">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div>hello</div>
      <div className="container h-full bg-blue-400">
        <Map></Map>
      </div>
    </main>
  )
}
