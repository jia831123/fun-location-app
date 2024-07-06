import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Dialog from '@mui/material/Dialog'
import { blue } from '@mui/material/colors'
import { CategoryEnum, CategoryMap } from '../service/api/searchShowAction'
import { Switch } from '@mui/material'
import getIconsPath from '../utils/getIconsPath'

export interface SimpleDialogProps {
  open: boolean
  onClose: (value: string) => void
  actives: CategoryEnum[]
  updateActives: Function
}

export default function LocationTypeDialog(props: SimpleDialogProps) {
  const { onClose, open, actives, updateActives } = props

  const handleListItemClick = (value: string) => {
    onClose(value)
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <List sx={{ pt: 0, mx: 2 }}>
        {(Object.values(CategoryEnum) as CategoryEnum[])
          .filter((e) => {
            return String(e).toUpperCase() !== 'ALL' && Number.isNaN(Number(e))
          })
          .map((item) => (
            <ListItem disableGutters key={item}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <img
                    src={getIconsPath(
                      CategoryEnum[item as number] as CategoryEnum
                    )}
                  />
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={CategoryMap[CategoryEnum[item as any] as CategoryEnum]}
              ></ListItemText>
              <Switch
                defaultChecked
                checked={actives.includes(
                  CategoryEnum[item as any] as CategoryEnum
                )}
                onChange={(event) => {
                  return event.target.checked
                    ? updateActives([...actives, CategoryEnum[item as any]])
                    : updateActives([
                        ...actives.filter(
                          (e) => e !== CategoryEnum[item as any]
                        ),
                      ])
                }}
              />
            </ListItem>
          ))}
      </List>
    </Dialog>
  )
}
