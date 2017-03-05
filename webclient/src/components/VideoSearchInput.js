import React from 'react'

export default function VideoSearchInput ({ value, onChange }) {
  return (
    <input
      type='text'
      placeholder='Search for a Video...'
      onChange={(evt) => onChange(evt.target.value)}
    />
  )
}
