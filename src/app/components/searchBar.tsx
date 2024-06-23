import { TextField } from '@mui/material'
import { useState } from 'react'

export default () => {
  const [keyWord, setKeyWord] = useState('')
  return (
    <div className="flex w-full p-2 bg-white">
      <TextField
        size="small"
        id="outlined-controlled"
        label="search"
        value={keyWord}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setKeyWord(event.target.value)
        }}
      />
    </div>
  )
}
