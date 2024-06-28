'use client'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
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
const MapComponent = dynamic(() => import('./components/map'), {
  ssr: false,
})
const Page = () => {
  const [data, setData] = useState([])
  const [currentData, setCurrentData] = useState(null)
  const [infoCardVisible, setInfoCardVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  console.log('page')
  useEffect(() => {
    if (!currentData) return
    setInfoCardVisible(true)
    handleScrollToTop()
  }, [currentData])
  useEffect(() => {
    searchShoAction()
      .then((data) => setData(data as any))
      .catch((error) => console.error('Error fetching data:', error))
  }, [])
  const childRef = useRef<any>(null)

  const handleScrollToTop = () => {
    if (childRef.current) {
      childRef.current.scrollToTop()
    }
  }
  const [open, setOpen] = useState(false)
  function safariHacks() {
      let windowsVH = window.innerHeight / 100;
      document.querySelector('.main-container').style.setProperty('--vh', windowsVH + 'px')
      window.addEventListener('resize', function() {
          document.querySelector('.main-container').style.setProperty('--vh', windowsVH + 'px')
      });
  }
safariHacks()
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
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="container flex flex-col h-full w-full max-w-[430px]">
        <SearchBar openDraw={toggleDrawer(true)}></SearchBar>
        {activeIndex === 0 ? (
          <MapComponent
            setCurrentData={(data) => {
              console.log(data)
              setCurrentData(data)
            }}
            className={`z-10`}
            locations={data}
          ></MapComponent>
        ) : (
          <LocalList className={`z-20 `} locations={data}></LocalList>
        )}

        <BottomNav active={activeIndex} setActive={setActiveIndex}></BottomNav>
        <InfoCard
          ref={childRef}
          isVisible={infoCardVisible}
          onClose={() => setInfoCardVisible(false)}
          data={currentData}
          className="fix bottom-0 z-50 h-[30vh] max-w-[430px]"
        ></InfoCard>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>
    </main>
  )
}
export default Page
