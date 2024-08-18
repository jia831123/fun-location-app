import * as L from 'leaflet'
import 'leaflet.markercluster'
import { useEffect, useState, memo, useRef } from 'react'
import { CategoryEnum, Data, Response } from '../service/api/searchShowAction'
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
function getCustomClickIcon(type: CategoryEnum) {
  return L.icon({
    iconUrl: getIconsPath(type).replace('.png', '') + '_click.png',
    iconSize: [42, 42],
  })
}

function getLocation(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, rej) => {
    console.log('getLocation')
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('getLocation successfully')
          const { latitude, longitude } = position.coords
          return resolve({ latitude, longitude })
        },
        (error) => {
          // 錯誤回調
          console.error('Error Code:', error.code)
          console.error('Error Message:', error.message)
          rej('get location failed')
        },
        { timeout: 5000 }
      )
    } else {
      return resolve({
        latitude: 51.505,
        longitude: -0.09,
      })
    }
  })
}

async function initMap(hideLoading:Function,showLoading:Function,center?: [latitude: number, longitude: number]) {
  console.log('prepare init map')
  showLoading()
  const location = await getLocation().catch((e) => ({
    latitude: 25.03746,
    longitude: 121.564558,
  }))
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
  console.log('map add locate')
  // Add the locate control to the map
  L.control.locate().addTo(lMap)

  // Handle location found event
  lMap.on('locationfound', function (e) {})
  console.log('map init success')
  hideLoading()
  return lMap
}
const Map = memo(
  ({
    locations = [],
    className = '',
    currentData,
    setCurrentData = (data) => {},
    initCenter,
    hideLoading,
    showLoading
  }: {
    locations: Response
    className?: string
    currentData: Data | null
    setCurrentData: (data: any) => void
    initCenter?: [number, number]
    hideLoading:Function
    showLoading:Function
  }) => {
    console.log('map render')
    let isInit = false
    const [map, setMap] = useState<L.Map | null>(null)
    const [currentMarker, setCurrentMarker] = useState<InstanceType<
      typeof L.Marker
    > | null>(null)
    const [layers, setLayers] = useState<L.Layer[]>([])
    const currentMarkerRef = useRef(currentMarker)
    currentMarkerRef.current = currentMarker
    const currentDataRef = useRef(currentData)
    currentDataRef.current = currentData
    useEffect(() => {
      if (isInit === false) {
        console.log('init map')
        initMap(hideLoading,showLoading,initCenter).then((map) => {
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
      if (layers.length > 0) {
        layers.forEach((layer) => map.removeLayer(layer))
      }
      const markers = getMarkers(locations, setCurrentData, map)
      setLayers([...layers, markers])
      map.addLayer(markers)
    }, [locations])

    const getMarkers = (
      locations: Response,
      setCurrentData: Function,
      map: any
    ) => {
      const markers = L.markerClusterGroup({ maxClusterRadius: 40 })
      locations.forEach((item) => {
        const marker = L.marker(
          [
            Number(item.showInfo[0].latitude) as number,
            Number(item.showInfo[0].longitude) as number,
          ],
          {
            icon: getCustomIcon(item.category as CategoryEnum),
          }
        )
        markers.addLayer(marker)
        marker.on('click', function () {
          if (
            currentMarkerRef.current !== null &&
            currentDataRef.current !== null
          ) {
            currentMarkerRef.current.setIcon(
              getCustomIcon(currentDataRef.current.category as CategoryEnum)
            )
          }
          // 設置當前被點擊的 Marker 圖標
          marker.setIcon(getCustomClickIcon(item.category as CategoryEnum))
          // 更新 currentMarker
          setCurrentMarker(marker)
          setCurrentData(item)
          map.setView([
            Number(item.showInfo[0].latitude) as number,
            Number(item.showInfo[0].longitude) as number,
          ])
        })
      })
      return markers
    }
    return (
      <div
        id="map"
        className={clsx('h-full w-[100%] border-1', className)}
      ></div>
    )
  }
)
Map.displayName = 'Map'
export default Map
