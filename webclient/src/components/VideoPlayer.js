import React, {Component} from 'react'

import YouTube from 'react-youtube'

export default class VideoPlayer extends Component {
  componentDidUpdate () {
    console.log('componentDidUpdate')
    // this.updateMarkers(this.props.markers)
  }

  render () {
    const {src, onReady} = this.props
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }

    return (
      <YouTube
        videoId={src}
        opts={opts}
        onReady={onReady}
      />
    )
  }

}
