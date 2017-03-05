import React from 'react'

export default function MarkerSearchInput ({ value, onChange }) {
  return (
    <input
      type='text'
      placeholder='Search for text within the video...'
      onChange={(evt) => onChange(evt.target.value)}
    />
  )
}
