import React from 'react'

import MarkersSearch from './MarkersSearch'

export default class SearchContainer extends React.Component {
  render () {
    const { fetchMarkers, markers } = this.props

    return (
      <div class='search-container'>
        <input type='text' />
        <button onClick={fetchMarkers}>load markers</button>
        <MarkersSearch markers={markers} />
      </div>
    )
  }
}
