import * as L from 'leaflet'
import 'leaflet.markercluster'
import { useEffect, useState } from 'react'
import { Response } from '../service/api/searchShowAction'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
function getLocation() {
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
export default ({ locations = [] }: { locations: Response }) => {
  let isInit = false
  const [map, setMap] = useState<L.Map | null>(null)

  async function initMap() {
    if (isInit) return
    isInit = true
    const location = await getLocation()
    let result = L.map('map').setView(
      location
        ? [location.latitude as number, location.longitude]
        : [(51.505, -0.09)],
      13
    )

    const baseEMAP = L.tileLayer(
      'https://wmts.nlsc.gov.tw/wmts/EMAP/default/GoogleMapsCompatible/{z}/{y}/{x}',
      {
        maxNativeZoom: 20,
        maxZoom: 20,
      }
    ).addTo(result)
    setMap(result)
  }
  useEffect(() => {
    initMap()
  }, [])
  useEffect(() => {
    console.log('update map', map)

    if (!map) return
    const markers = L.markerClusterGroup()
    console.log('markers', markers)
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
        ).bindPopup(
          `
            title:  ${item.title}<br>,
            time: ${item.showInfo[0].time}<br>
            location: ${item.showInfo[0].location}<br>
            locationName: ${item.showInfo[0].locationName}<br>
            onSales: ${item.showInfo[0].onSales}<br>
            price: ${item.showInfo[0].price}<br>
            latitude?: ${item.showInfo[0].latitude}<br>
            longitude?: ${item.showInfo[0].longitude}<br>
            endTime: ${item.showInfo[0].endTime}`
        )
      })
      .forEach((item) => markers.addLayer(item))
    map.addLayer(markers)
  }, [locations])
  return <div id="map" className="h-full w-[100%] border-1"></div>
}
