'use client'
import Head from 'next/head'
import { useEffect, useMemo, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import SearchBar from './components/searchBar'
import searchShoAction from './service/api/searchShowAction'
import InfoCard from './components/infoCard'
import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic'
import {
  Box,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  Drawer,
} from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import BottomNav from './components/bottomNav'
import LocalList from './components/localList'
import { Data as Location } from '@/app/service/api/searchShowAction'
const MapComponent = dynamic(() => import('./components/map'), {
  ssr: false,
})
function safariHacks() {
  let windowsVH = window.innerHeight / 100
  const mainContainer = document.querySelector('.main-container') as HTMLElement
  if (mainContainer === null) return
  mainContainer.style.setProperty('--vh', windowsVH + 'px')
  window.addEventListener('resize', function () {
    mainContainer.style.setProperty('--vh', windowsVH + 'px')
  })
}
const Page = () => {
  const [data, setData] = useState<any[]>([])
  const [currentData, setCurrentData] = useState<Location | null>(null)
  const [infoCardVisible, setInfoCardVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [searchWord, setSearchWord] = useState<string>('')
  useEffect(() => {
    if (!currentData) return
    setInfoCardVisible(true)
    handleScrollToTop()
  }, [currentData])
  useEffect(() => {
    safariHacks()
    searchShoAction()
      .then((data) => setData(data as any))
      .catch((error) => console.error('Error fetching data:', error))
  }, [])
  const childRef = useRef<any>(null)

  const locationsForList = useMemo(() => {
    const hasValidCoordinates = (location: Location) =>
      location.showInfo[0]?.latitude !== null &&
      location.showInfo[0]?.longitude !== null

    if (!searchWord) {
      // 沒有搜索詞時過濾有效座標的 location
      return data.filter(hasValidCoordinates)
    }

    // 有搜索詞時根據標題和座標過濾
    return data.filter(
      (location) =>
        location.title.includes(searchWord) && hasValidCoordinates(location)
    )
  }, [data, searchWord])
  const handleScrollToTop = () => {
    if (childRef.current) {
      childRef.current.scrollToTop()
    }
  }
  const [open, setOpen] = useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
  return (
    <main className="flex main-container flex-col items-center justify-center bg-black">
      <div className="container flex flex-col h-full w-full max-w-[430px]">
        <SearchBar
          searchWord={searchWord}
          setSearchWord={setSearchWord}
          openDraw={toggleDrawer(true)}
          searchClickHandle={() => setActiveIndex(1)}
        ></SearchBar>
        {activeIndex === 0 ? (
          <div className="h-full">
            <MapComponent
              setCurrentData={(data) => {
                setCurrentData(data)
              }}
              className={`z-10`}
              locations={data}
              initCenter={
                currentData
                  ? [
                      Number(currentData.showInfo[0].latitude),
                      Number(currentData.showInfo[0].longitude),
                    ]
                  : undefined
              }
            ></MapComponent>
            <InfoCard
              ref={childRef}
              isVisible={infoCardVisible}
              onClose={() => setInfoCardVisible(false)}
              data={currentData}
              className="absolute  bottom-0 z-50 h-[30vh] max-w-[430px]"
            ></InfoCard>
          </div>
        ) : (
          <LocalList
            className={`z-20 `}
            locations={locationsForList}
            setCurrentData={(data) => {
              setActiveIndex(0)
              setCurrentData(data)
              console.log(data.showInfo[0])
            }}
          ></LocalList>
        )}

        <BottomNav active={activeIndex} setActive={setActiveIndex}></BottomNav>

        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>
    </main>
  )
}
export default Page
