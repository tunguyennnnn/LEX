import React from 'react'

import { Link } from 'react-router'

import {formatTime} from '../utils/time'

export default class VideoListItem extends React.Component {
  render () {
    const { id, thumbnailUrl, title, duration } = this.props

    // duration = timeFormat
    const thumbStyle = {
      backgroundImage: `url("${thumbnailUrl}")`
    }

    const videoLink = `/video/${id}`

    return (
      <li class='video-list-item'>
        <Link to={videoLink} class='video-list-item-link'>
          <div class='video-list-item-image'>
            <div class='video-list-item-image-content fade-in'
              style={thumbStyle} />
          </div>
          <h3 class='video-list-item-title'>{title}</h3>
          <div class='video-list-item-meta'>
            <div class='video-list-item-duration'>{formatTime(duration)}</div>
          </div>
        </Link>
      </li>
    )
  }
}
