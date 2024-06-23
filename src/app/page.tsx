'use client'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import Map from './components/map'
import SearchBar from './components/searchBar'
import searchShoAction from './service/api/searchShowAction'
import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('./components/map'), {
  ssr: false,
})
const Page = () => {
  let map: any
  const [data, setData] = useState([])

  useEffect(() => {
    searchShoAction()
      .then((data) => setData(data as any))
      .catch((error) => console.error('Error fetching data:', error))
  }, [])
  return (
    <main className="flex h-[100vh] flex-col items-center justify-center bg-black">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="container flex flex-col h-full w-full max-w-[390px]">
        <SearchBar></SearchBar>
        <MapComponent locations={data}></MapComponent>
      </div>
    </main>
  )
}
export default Page
