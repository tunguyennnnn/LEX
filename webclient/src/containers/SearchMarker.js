import React from 'react'

import MarkerSearchInput from '../components/MarkerSearchInput'
import MarkerList from '../components/MarkerList'

export default class SearchMarker extends React.Component {
  constructor (props) {
    super(props)
    this.handleMarkerSearch = this.handleMarkerSearch.bind(this)
  }

  handleMarkerSearch (query) {
    this.props.searchMarkers(query)
  }

  render () {
    const { markers, loading } = this.props

    return (
      <div class='search-container'>
        <MarkerSearchInput onChange={this.handleMarkerSearch} />
        <MarkerList markers={markers} loading={loading} />
      </div>
    )
  }
}
