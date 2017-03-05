import React from 'react'

export default function UserSearchInput ({ value, onChange }) {
  return (
    <input
      type='text'
      placeholder='Search for a Video...'
      onChange={(evt) => onChange(evt.target.value)}
    />
  )
}
