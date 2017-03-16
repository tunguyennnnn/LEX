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
    this.handlePlayerReady = this.handlePlayerReady.bind(this)
    this.handleSeekTo = this.handleSeekTo.bind(this)
    this.player = {}
  }

  handleMarkerSearch (query) {
    this.props.searchMarkers(query)
  }

  handlerMarkerClear () {
    this.props.clearMarkersResults()
  }

  handleSeekTo (time) {
    if (this.player) {
      this.player.seekTo(time)
    }
  }

  handlePlayerReady (event) {
    this.player = event.target
  }

  render () {
    const { markers, markerSearchLoading, params } = this.props
    const { videoId } = params

    return (
      <div id='videoContainer' class='main-player'>
        <VideoPlayer
          src={videoId}
          onReady={this.handlePlayerReady}
        />
        <SearchMarker
          markers={markers}
          loading={markerSearchLoading}
          seekTo={this.handleSeekTo}
          searchMarkers={this.handleMarkerSearch}
          clearMarkers={this.handleMarkerClear}
         />
      </div>
    )
  }
}
