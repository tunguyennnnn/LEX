import React from 'react'
import { connect } from 'react-redux'

import { searchMarkers, clearMarkersResults } from '../actions/markerSearch'

import SearchMarkerContainer from './SearchMarkerContainer'
import VideoPlayer from '../components/VideoPlayer'

@connect((store) => ({
  markers: store.markerResults,
  markerSearchLoading: store.markerSearch
}),
  { searchMarkers, clearMarkersResults }
)
export default class PlayerContainer extends React.Component {
  constructor (props) {
    super(props)
    this.handleMarkerSearch = this.handleMarkerSearch.bind(this)
    this.handlerMarkerClear = this.handlerMarkerClear.bind(this)
  }

  handleMarkerSearch (query) {
    this.props.searchMarkers(query)
  }

  handlerMarkerClear () {
    this.props.clearMarkersResults()
  }

  render () {
    const { markers, markerSearchLoading, params } = this.props
    const { videoId } = params
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`

    return (
      <div id='videoContainer' class='main-player'>
        <VideoPlayer
          markers={markers}
          loading={markerSearchLoading}
          clearMarkers={this.handleMarkerClear}
          src={videoUrl}
        />
        <SearchMarkerContainer
          markers={markers}
          loading={markerSearchLoading}
          searchMarkers={this.handleMarkerSearch}
          clearMarkers={this.handleMarkerClear}
         />
      </div>
    )
  }
}
