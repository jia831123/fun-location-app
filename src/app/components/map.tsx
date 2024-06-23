import * as L from 'leaflet'
import 'leaflet.markercluster'
import { useEffect, useState } from 'react'
import { Response } from '../service/api/searchShowAction'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.locatecontrol' // Import plugin
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css' // Import styles
import clsx from 'clsx' // 用於條件合併 class 名稱

function getLocation(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, rej) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        return resolve({ latitude, longitude })
      })
    } else {
      return resolve({
        latitude: 51.505,
        longitude: -0.09,
      })
    }
  })
}
async function initMap(isInit: boolean) {
  if (isInit) return
  isInit = true
  const location = await getLocation()
  let lMap = L.map('map').setView(
    location
      ? [Number(location.latitude), Number(location.longitude)]
      : [51.505, -0.09],
    13
  )

  const baseEMAP = L.tileLayer(
    'https://wmts.nlsc.gov.tw/wmts/EMAP/default/GoogleMapsCompatible/{z}/{y}/{x}',
    {
      maxNativeZoom: 20,
      maxZoom: 20,
    }
  ).addTo(lMap)

  // Add the locate control to the map
  L.control.locate().addTo(lMap)

  // Handle location found event
  lMap.on('locationfound', function (e) {})
  return lMap
}
const Map = ({
  locations = [],
  className = '',
  setCurrentData = (data) => {},
}: {
  locations: Response
  className?: string
  setCurrentData: (data: any) => void
}) => {
  let isInit = false
  const [map, setMap] = useState<L.Map | null>(null)

  useEffect(() => {
    initMap(isInit).then((map) => setMap(map as any))
  }, [])
  useEffect(() => {
    if (!map) return
    const markers = L.markerClusterGroup()
    const customIcon = L.icon({
      iconUrl: '/point.png',
      iconSize: [42, 42],
    })
    locations
      .filter(
        (item) =>
          item.showInfo[0] &&
          'latitude' in item.showInfo[0] &&
          'longitude' in item.showInfo[0]
      )
      .map((item) => {
        return L.marker(
          [
            Number(item.showInfo[0].latitude) as number,
            Number(item.showInfo[0].longitude) as number,
          ],
          {
            icon: customIcon,
          }
        ).addEventListener('click', () => {
          setCurrentData(item)
          map.setView(
            [
              Number(item.showInfo[0].latitude) as number,
              Number(item.showInfo[0].longitude) as number,
            ],
            18
          )
        })
      })
      .forEach((item) => markers.addLayer(item))
    map.addLayer(markers)
  }, [locations])
  return (
    <div id="map" className={clsx('h-full w-[100%] border-1', className)}></div>
  )
}
export default Map
