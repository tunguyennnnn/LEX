import React from 'react'

import VideoListItem from './VideoListItem'

export default class VideoList extends React.Component {
  render () {
    const { videos, listName } = this.props

    const videoListItems = videos.map((v, i) =>
      <VideoListItem
        key={i}
        id={v.id}
        thumbnailUrl={v.thumbnailUrl}
        title={v.title}
        duration={v.duration} />
    )

    return (
      <div class='video-list-block'>
        <h5 class='video-list-title'>{listName}</h5>
        <ul class='video-list'>
          {videoListItems}
        </ul>
      </div>
    )
  }
}
