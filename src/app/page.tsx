'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import SearchBar from './components/searchBar'
import searchShoAction, { CategoryEnum } from './service/api/searchShowAction'
import InfoCard from './components/infoCard'
import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic'
import {
  Box,
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
import FavoritesList from './components/favoritesList'
import LocationTypeDialog from './components/locationTypeDialog'
import { Data as Location } from '@/app/service/api/searchShowAction'
import vconsole from '@/app/utils/vconsole'
import AboutDialog from './components/aboutDialog'
import BackDrop from './components/backDrop'
const MapComponent = dynamic(() => import('./components/map'), {
  ssr: false,
})

function getDefaultActiveTypes() {
  if (typeof window === 'undefined')
    return [
      ...(Object.values(CategoryEnum).filter(
        (e) => typeof e === 'number'
      ) as any),
    ]
  return localStorage.getItem('activeTypes')
    ? JSON.parse(localStorage.getItem('activeTypes') as string)
    : [...Object.values(CategoryEnum).filter((v) => typeof v === 'number')]
}

function getFavorites() {
  if (typeof window === 'undefined') {
    return []
  }
  return localStorage.getItem('favorites')
    ? JSON.parse(localStorage.getItem('favorites') as string)
    : []
}
function Page() {
  const [res, setRes] = useState<Location[]>([])
  const [activeTypes, setActiveTypes] = useState<CategoryEnum[]>(
    getDefaultActiveTypes()
  )
  const [favorites, setFavorites] = useState<string[]>(getFavorites())
  useEffect(() => {
    // 每當 activeTypes 改變時，將其保存到 localStorage
    localStorage.setItem('activeTypes', JSON.stringify(activeTypes))
  }, [activeTypes])
  useEffect(() => {
    // 每當 activeTypes 改變時，將其保存到 localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])
  const data = useMemo<Location[]>(
    () =>
      res.filter((r) => {
        return activeTypes.includes(Number(r.category))
      }),
    [res, activeTypes]
  )
  const [currentData, setCurrentData] = useState<Location | null>(null)
  const [infoCardVisible, setInfoCardVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [searchWord, setSearchWord] = useState<string>('')
  const [dialogVisible, setDialogVisible] = useState(false)
  const [aboutDialogVisable, setAboutDialogVisible] = useState(false)
  const [isBackDrop, setBackDrop] = useState(true)
  const infoCardRef = useRef<{ scrollToTop: () => void }>(null)

  const showLoading = () => setBackDrop(true)
  const hideLoading = () => setBackDrop(false)
  useEffect(() => {
    if (!currentData) return
    setInfoCardVisible(true)
    handleScrollToTop()
  }, [currentData])
  useEffect(() => {
    // vConsole 只在瀏覽器環境下運行
    if (typeof window !== 'undefined') {
      //vconsole() // 初始化 vConsole
    }
    (function safariHacks() {
      let windowsVH = window.innerHeight / 100
      const mainContainer = document.querySelector('.main-container') as HTMLElement
      if (mainContainer === null) return
      mainContainer.style.setProperty('--vh', windowsVH + 'px')
      window.addEventListener('resize', function () {
        mainContainer.style.setProperty('--vh', windowsVH + 'px')
      })
    })()
    showLoading()
    searchShoAction()
      .then((data) => setRes(data as any))
      .catch((error) => console.error('Error fetching data:', error))
      .finally(() => hideLoading())
  }, [])

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
    if (infoCardRef.current) {
      infoCardRef.current.scrollToTop()
    }
  }
  const [open, setOpen] = useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }
  const DrawerList = (
    <Box role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {['關於'].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            onClick={(e) => setAboutDialogVisible(true)}
          >
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
      <div className="container flex  flex-col h-full w-full max-w-[430px]">
        <SearchBar
          searchWord={searchWord}
          setSearchWord={setSearchWord}
          openDraw={toggleDrawer(true)}
          searchClickHandle={() => setActiveIndex(1)}
          openLegend={() => setDialogVisible(true)}
        />
        {activeIndex === 0 ? (
          <div className="h-full">
            <MapComponent
              currentData={currentData}
              setCurrentData={(data) => {
                setCurrentData(data)
              }}
              className="z-10"
              locations={data}
              hideLoading={hideLoading}
              showLoading={showLoading}
              initCenter={
                currentData
                  ? [
                      Number(currentData.showInfo[0].latitude),
                      Number(currentData.showInfo[0].longitude),
                    ]
                  : undefined
              }
            />
            <InfoCard
              ref={infoCardRef}
              isVisible={infoCardVisible}
              onClose={() => setInfoCardVisible(false)}
              data={currentData}
              className="z-50 h-[30vh]"
            ></InfoCard>
          </div>
        ) : activeIndex===1?(
          <LocalList
            className={`z-20 `}
            locations={locationsForList}
            favorites={favorites}
            setFavorites={(data)=>{
              setFavorites(data)
            }}
            setCurrentData={(data) => {
              setActiveIndex(0)
              setCurrentData(data)
            }}
          ></LocalList>
        ):(
          <FavoritesList
            className={`z-20 `}
            locations={locationsForList}
            favorites={favorites}
            setFavorites={data=>{
              setFavorites(data)
            }}
            setCurrentData={(data) => {
              setActiveIndex(0)
              setCurrentData(data)
            }}
          ></FavoritesList>
        )}

        <BottomNav active={activeIndex} setActive={setActiveIndex}></BottomNav>

        <Drawer anchor={'top'} open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
        <AboutDialog
          open={aboutDialogVisable}
          setOpen={setAboutDialogVisible}
        ></AboutDialog>
        <LocationTypeDialog
          actives={activeTypes}
          updateActives={setActiveTypes}
          open={dialogVisible}
          onClose={() => setDialogVisible(false)}
        />
      </div>
      <BackDrop open={isBackDrop} />
    </main>
  )
}
export default Page
