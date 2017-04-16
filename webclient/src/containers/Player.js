import React from 'react'
import { connect } from 'react-redux'

import { searchMarkers, clearMarkersResults } from '../actions/markerSearch'

import SearchMarker from './SearchMarker'
import VideoPlayer from '../components/VideoPlayer'
import SummaryText from '../components/SummaryText'

@connect((store) => ({
  markerSearch: store.markerSearch,
  videoSearch: store.videoSearch
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
    const { markerSearch, videoSearch, params } = this.props
    const { videoId } = params

    const summary = videoSearch.videos
      .filter((v) => v.video_id === videoId)[0].summary

    return (
      <div id='videoContainer' class='main-player'>
        <div class='row'>
          <div class='column column-50'>
            <div class='row'>
              <div class='column'>
                <VideoPlayer
                  src={videoId}
                  onReady={this.handlePlayerReady}
                />
              </div>
            </div>
            <div class='row'>
              <div class='column'>
                <SummaryText summary={summary} />
              </div>
            </div>
          </div>
          <div class='column column-40'>
            <SearchMarker
              markerSearch={markerSearch}
              seekTo={this.handleSeekTo}
              search={this.handleMarkerSearch}
              clearMarkers={this.handleMarkerClear}
             />
          </div>
        </div>
      </div>
    )
  }
}
