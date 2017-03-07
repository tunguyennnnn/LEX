import React, {Component} from 'react'
import cx from 'classnames'
import videojs from 'video.js'
import 'videojs-youtube/dist/Youtube.js'
import 'videojs-markers/dist/videojs-markers.js'
import _ from 'lodash'

const DEFAULT_VIDEO_OPTIONS = {
  autoplay: true,
  controls: true
}

export default class VideoPlayer extends Component {
  constructor () {
    super()
    this.state = {
      player: {}
    }
  }
  componentDidMount () {
    console.log('did mount')
    const self = this
    const options = _.defaults({}, this.props.options, DEFAULT_VIDEO_OPTIONS)
    options.techOrder = ['youtube']
    options.sources = [{type: 'video/youtube', 'src': this.props.src}]
    const player = videojs('aVideo', options).ready(function () {
      self.player = this
      console.log('video ready')
        // self.player.on('play', self.handlePlay);
    })
    player.markers({
      markerStyle: {
        width: '3px',
        'background-color': 'red'
      },
      markerTip: {
        display: true,
        text: (marker) => marker.text
      },
      breakOverlay: {
        display: false,
        displayTime: 1,
        text: (marker) => marker.text
      },
      markers: []
    })
  }

  updateMarkers (markers) {
    this.player.markers.reset(markers)
  }

  componentWillUnmount () {
    this.player.dispose()
    this.props.clearMarkers()
  }

  componentDidUpdate () {
    console.log('componentDidUpdate')
    this.updateMarkers(this.props.markers)
  }

  render () {
    const videoPlayerClasses = cx({
      'video-js': true,
      'vjs-default-skin': true,
      'vjs-fluid': true
    })

    return <video id='aVideo' class={videoPlayerClasses} />
  }
}
