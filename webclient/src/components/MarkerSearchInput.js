import React from 'react'
import TextField from 'material-ui/TextField'

export default function MarkerSearchInput ({ value, onChange }) {
  return (
    <TextField
      hintText='Search for text within the video...'
      type='text'
      onChange={(evt) => onChange(evt.target.value)}
    />
  )
}
