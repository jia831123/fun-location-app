'use client'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import Map from './components/map'
import SearchBar from './components/searchBar'
import searchShoAction from './service/api/searchShowAction'
import 'leaflet/dist/leaflet.css'

export default () => {
  let map: any
  const [data, setData] = useState([])

  useEffect(() => {
    searchShoAction()
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [])
  return (
    <main className="flex h-[100vh] flex-col items-center justify-center bg-black">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="container flex flex-col h-full w-full max-w-[390px]">
        <SearchBar></SearchBar>
        <Map locations={data}></Map>
      </div>
    </main>
  )
}
