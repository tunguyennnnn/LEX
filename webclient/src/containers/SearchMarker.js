import React from 'react'

import MarkerSearchInput from '../components/MarkerSearchInput'
import MarkerList from '../components/MarkerList'

export default class SearchMarker extends React.Component {
  constructor (props) {
    super(props)
    this.handleMarkerSearch = this.handleMarkerSearch.bind(this)
  }

  handleMarkerSearch (query) {
    this.props.search(query)
  }

  render () {
    const { markerSearch, seekTo } = this.props

    return (
      <div class='search-container'>
        <MarkerSearchInput onChange={this.handleMarkerSearch} />
        <MarkerList markerSearch={markerSearch} seekTo={seekTo} />
      </div>
    )
  }
}
