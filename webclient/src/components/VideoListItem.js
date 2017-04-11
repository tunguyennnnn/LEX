import React from 'react'

import { Link } from 'react-router'
import {formatTime} from '../utils/time'
import SummaryBox from './SummaryBox'
export default class VideoListItem extends React.Component {
  render () {
    const { id, thumbnailUrl, title, duration, summary } = this.props

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
          <SummaryBox summary={summary} />
          <h3 class='video-list-item-title'>{title}</h3>
          <div class='video-list-item-meta'>
            <div class='video-list-item-duration'>{formatTime(duration, true)}</div>
          </div>
        </Link>
      </li>
    )
  }
}
