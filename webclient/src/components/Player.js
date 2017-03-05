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

class Player extends Component {
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
    this.player.markers.add(markers)
  }

  componentWillUnmount () {
    console.log('will unmount')
    this.player.dispose()
    this.props.cleanMarkers()
  }

  componentDidUpdate () {
    console.log('componentDidUpdate')
  }

  render () {
    const { markers } = this.props

    console.log('update markers', markers)
    if (markers.length) {
      this.updateMarkers(markers)
    }

    const videoPlayerClasses = cx({
      'video-js': true,
      'vjs-default-skin': true,
      'vjs-fluid': true
    })

    return <video id='aVideo' class={videoPlayerClasses} />
  }
}

Player.propTypes = {
  src: React.PropTypes.string.isRequired,
  options: React.PropTypes.object,
  markers: React.PropTypes.array
}

export default Player
