import { Response } from '@/app/service/api/searchShowAction'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { Data as Location } from '@/app/service/api/searchShowAction'
import IconButton from '@mui/material/IconButton';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ShareLocationOutlinedIcon from '@mui/icons-material/ShareLocationOutlined';
import clsx from 'clsx' // 用於條件合併 class 名稱
import * as React from 'react';
import { memo } from 'react'


type MouseEvent = React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
const LocalList = memo(
  ({
    locations,
    className = '',
    setCurrentData,
    favorites,
    setFavorites
  }: {
    locations: Response
    className: string
    setCurrentData: (data: Location) => undefined
    favorites:string[]
    setFavorites:(favorites:string[])=>undefined
  }) => {
    function handleIconClick(event:MouseEvent,UID:string){
      event.stopPropagation(); // 阻止事件冒泡
      favorites.includes(UID)?setFavorites(favorites.filter(e=>e!==UID)):setFavorites([UID,...favorites])
      console.log([UID,...favorites]);
    }
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
            {locations.filter(l=>favorites.includes(l.UID)).map((location, index) => (
              <ListItem
                onClick={(e) => setCurrentData(location)}
                disablePadding
                key={`${location.UID + index}`}
              >
                <ListItemButton>
                  <ListItemText primary={location.title} />
                  <IconButton onClick={e=>handleIconClick(e,location.UID)}>
                    {favorites.includes(location.UID)?<ShareLocationOutlinedIcon />:<CircleOutlinedIcon />}
                  </IconButton>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
      </Box>
    )
  }
)
LocalList.displayName = 'LocalList'
export default LocalList
