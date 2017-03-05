import React from 'react'

export default class Layout extends React.Component {
  render () {
    const { markers } = this.props

    const mappedMarkers = markers.map((marker, i) => <li key={i}>{marker.text}</li>)

    return (
      <ul class='mark-list'>
        {mappedMarkers}
      </ul>
    )
  }
}
