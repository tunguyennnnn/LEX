import React from 'react'
import TextField from 'material-ui/TextField'

export default function VideoSearchInput ({ value, onChange }) {
  return (
    <TextField
      hintText='Search for a Video...'
      fullWidth={true}
      type='text'
      onChange={(evt) => onChange(evt.target.value)}
    />
  )
}
