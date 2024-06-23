'use client'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import Map from './components/map'
import SearchBar from './components/searchBar'
import searchShoAction from './service/api/searchShowAction'
import InfoCard from './components/infoCard'
import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('./components/map'), {
  ssr: false,
})
const Page = () => {
  const [data, setData] = useState([])
  const [currentData, setCurrentData] = useState(null)
  const [infoCardVisible, setInfoCardVisible] = useState(false)

  useEffect(() => {
    if (!currentData) return
    setInfoCardVisible(true)
  }, [currentData])
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
        <MapComponent
          setCurrentData={(data) => {
            console.log(data)
            setCurrentData(data)
          }}
          className="z-10"
          locations={data}
        ></MapComponent>
        <InfoCard
          isVisible={infoCardVisible}
          onClose={() => setInfoCardVisible(false)}
          data={currentData}
          className="fix bottom-0 z-50 h-[30vh]"
        ></InfoCard>
      </div>
    </main>
  )
}
export default Page
