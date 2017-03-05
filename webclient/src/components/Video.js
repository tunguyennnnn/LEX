import React from 'react'
import { connect } from 'react-redux'

import { fetchMarkers, cleanMarkers } from '../actions/markersActions'

import Player from './Player'
import SearchContainer from './SearchContainer'

@connect((store) => {
  return {
    markers: store.markers.markers
  }
})
export default class Video extends React.Component {
  fetchMarkers () {
    this.props.dispatch(fetchMarkers())
  }

  cleanMarkers () {
    this.props.dispatch(cleanMarkers())
  }

  render () {
    const { markers, params } = this.props
    const { videoId } = params
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`
    console.log(markers)
    console.log(videoId)

    return (
      <div id='videoContainer' class='main-player'>
        <Player
          cleanMarkers={this.cleanMarkers.bind(this)}
          markers={markers}
          src={videoUrl} />
        <SearchContainer
          markers={markers}
          fetchMarkers={this.fetchMarkers.bind(this)} />
      </div>
    )
  }
}
