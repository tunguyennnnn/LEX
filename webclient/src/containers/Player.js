import React from 'react'
import { connect } from 'react-redux'

import { searchMarkers, clearMarkersResults, receiveMarkers } from '../actions/markerSearch'

import SearchMarker from './SearchMarker'
import VideoPlayer from '../components/VideoPlayer'

@connect((store) => ({
  markers: store.markerResults,
  markerSearchLoading: store.markerSearch
}),
  { searchMarkers, clearMarkersResults, receiveMarkers }
)
export default class Player extends React.Component {
  constructor (props) {
    super(props)
    this.handleMarkerSearch = this.handleMarkerSearch.bind(this)
    this.handleMarkerClear = this.handlerMarkerClear.bind(this)
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
          clearMarkers={this.handleMarkerClear}
          src={videoUrl}
        />
        <SearchMarker
          markers={markers}
          loading={markerSearchLoading}
          searchMarkers={this.handleMarkerSearch}
          clearMarkers={this.handleMarkerClear}
         />
      </div>
    )
  }
}
