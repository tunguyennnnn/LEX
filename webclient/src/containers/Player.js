import React from 'react'
import { connect } from 'react-redux'

import { searchMarkers, clearMarkersResults } from '../actions/markerSearch'

import SearchMarker from './SearchMarker'
import VideoPlayer from '../components/VideoPlayer'

@connect((store) => ({
  markerSearch: store.markerSearch
}),
  { searchMarkers, clearMarkersResults }
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
    this.props.searchMarkers({query: query, videoId: this.props.params.videoId})
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
    console.log(this.props)
    const { markerSearch, params } = this.props
    const { videoId } = params

    return (
      <div id='videoContainer' class='main-player'>
        <VideoPlayer
          src={videoId}
          onReady={this.handlePlayerReady}
        />
        <SearchMarker
          markerSearch={markerSearch}
          seekTo={this.handleSeekTo}
          search={this.handleMarkerSearch}
          clearMarkers={this.handleMarkerClear}
         />
      </div>
    )
  }
}
