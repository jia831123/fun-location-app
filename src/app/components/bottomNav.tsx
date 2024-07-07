import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import MapIcon from '@mui/icons-material/Map'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered'
import LocationOnIcon from '@mui/icons-material/LocationOn'

export default function BottomNav({
  active,
  setActive,
}: {
  active: number
  setActive: Function
}) {
  const isInStandaloneMode = () => {
    if (typeof window !== 'undefined') {
      return !document.referrer
    }
    return false
  }
  return (
    <div className="bg-white">
      <BottomNavigation
        className={`${isInStandaloneMode() && 'mb-10'}`}
        showLabels
        value={active}
        onChange={(event, newValue) => {
          setActive(newValue)
        }}
      >
        <BottomNavigationAction value={0} icon={<MapIcon />} />
        <BottomNavigationAction value={1} icon={<FormatListNumberedIcon />} />
        <BottomNavigationAction value={2} icon={<LocationOnIcon />} />
      </BottomNavigation>
    </div>
  )
}
