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
  return (
    <BottomNavigation
      showLabels
      value={active}
      onChange={(event, newValue) => {
        setActive(newValue)
      }}
    >
      <BottomNavigationAction label="Map" icon={<MapIcon />} />
      <BottomNavigationAction
        label="Favorites"
        icon={<FormatListNumberedIcon />}
      />
      <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
    </BottomNavigation>
  )
}
