import * as L from 'leaflet'
import 'leaflet.markercluster'
import { useEffect, useState } from 'react'
import { CategoryEnum, Response } from '../service/api/searchShowAction'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import 'leaflet.locatecontrol' // Import plugin
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css' // Import styles
import clsx from 'clsx' // 用於條件合併 class 名稱
import getIconsPath from '../utils/getIconsPath'

function getCustomIcon(type: CategoryEnum) {
  return L.icon({
    iconUrl: getIconsPath(type),
    iconSize: [42, 42],
  })
}
function getMarkers(locations: Response, setCurrentData: Function, map: any) {
  const markers = L.markerClusterGroup()
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
          icon: getCustomIcon(item.category as CategoryEnum),
        }
      ).addEventListener('click', () => {
        setCurrentData(item)
        map.setView([
          Number(item.showInfo[0].latitude) as number,
          Number(item.showInfo[0].longitude) as number,
        ])
      })
    })
    .forEach((item) => markers.addLayer(item))
  return markers
}
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

async function initMap(center?: [latitude: number, longitude: number]) {
  const location = await getLocation()
  let lMap = L.map('map').setView(
    center ? [center[0], center[1]] : [location.latitude, location.longitude],
    13
  )
  L.tileLayer(
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
export default function Map({
  locations = [],
  className = '',
  setCurrentData = (data) => {},
  initCenter,
}: {
  locations: Response
  className?: string
  setCurrentData: (data: any) => void
  initCenter?: [number, number]
}) {
  let isInit = false
  const [map, setMap] = useState<L.Map | null>(null)
  useEffect(() => {
    console.log('init map')
    let lMap
    if (isInit === false) {
      lMap = initMap(initCenter).then((map) => {
        setMap(map as any)
        if (locations.length > 0) {
          const markers = getMarkers(locations, setCurrentData, map)
          map.addLayer(markers)
        }
      })
    }

    return () => {
      if (map && map.remove) {
        map.off()
        map.remove()
      }
    }
  }, [])
  useEffect(() => {
    if (!map) return
    const markers = getMarkers(locations, setCurrentData, map)
    map.addLayer(markers)
  }, [locations])
  return (
    <div id="map" className={clsx('h-full w-[100%] border-1', className)}></div>
  )
}
