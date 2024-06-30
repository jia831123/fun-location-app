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
    <div className="bg-white">
      <BottomNavigation
        className="mb-10"
        showLabels
        value={active}
        onChange={(event, newValue) => {
          setActive(newValue)
        }}
      >
        <BottomNavigationAction value={0} label="Map" icon={<MapIcon />} />
        <BottomNavigationAction
          value={1}
          label="Favorites"
          icon={<FormatListNumberedIcon />}
        />
        <BottomNavigationAction
          value={2}
          label="Nearby"
          icon={<LocationOnIcon />}
        />
      </BottomNavigation>
    </div>
  )
}
