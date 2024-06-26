import { Response } from '@/app/service/api/searchShowAction'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import clsx from 'clsx' // 用於條件合併 class 名稱
export default function LocalList({
  locations,
  className = '',
}: {
  locations: Response
  className: string
}) {
  return (
    <Box
      className={clsx('h-full w-[100%] border-1', className)}
      sx={{
        width: '100%',
        maxHeight: '100%',
        overflow: 'auto',
        bgcolor: 'background.paper',
      }}
    >
      <nav aria-label="secondary mailbox folders">
        <List>
          {locations.map((location) => (
            <ListItem disablePadding key={location.UID}>
              <ListItemButton>
                <ListItemText primary={location.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  )
}
