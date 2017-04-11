import React from 'react'

import VideoListItem from './VideoListItem'

export default class VideoList extends React.Component {
  render () {
    const { videoSearch, listName } = this.props
    const videoListItems = videoSearch.videos.map((v, i) =>
      <VideoListItem
        key={i}
        _id={v._id}
        summary={v.summary}
        id={v.video_id}
        thumbnailUrl={v.thumbnail}
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
