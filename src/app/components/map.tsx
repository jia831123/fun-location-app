import L from 'leaflet'
import { useEffect, useState } from 'react'

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
export default ({ locations = {} }) => {
  const customIcon = L.icon({
    iconUrl: '/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })
  let map: any
  async function initMap() {
    if (map) return
    console.log('initMap')
    const location = await getLocation()
    map = L.map('map').setView(
      location
        ? [location.latitude as number, location.longitude]
        : [(51.505, -0.09)],
      13
    )
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)
  }
  useEffect(() => {
    initMap()
  }, [])
  return (
    <div id="map" className="h-full w-[100%] border-1 border-gray-950"></div>
  )
}
