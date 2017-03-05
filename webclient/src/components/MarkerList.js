import React from 'react'

export default class MarkerList extends React.Component {
  render () {
    const { markers } = this.props

    const mappedMarkers = markers.map((marker, i) =>
      <li onClick='' key={i}>
        <span class='marker-time'>{marker.time}</span> {marker.text}
      </li>
    )

    return (
      <ul class='mark-list'>
        {mappedMarkers}
      </ul>
    )
  }
}
