import React from 'react'
import { connect } from 'react-redux'

import { searchVideos } from '../actions/videoSearch'

import VideoSearchInput from '../components/VideoSearchInput'
import VideoList from '../components/VideoList'

@connect((store) => ({
  videos: store.videoResults,
  videoSearchLoading: store.videoSearch
}),
  { searchVideos }
)
export default class SearchVideo extends React.Component {
  constructor (props) {
    super(props)
    this.handleVideoSearch = this.handleVideoSearch.bind(this)
  }

  handleVideoSearch (query) {
    this.props.searchVideos(query)
  }

  render () {
    console.log(this.props)
    const { videos, videoSearchLoading } = this.props

    const listName = 'Recents'

    return (
      <div>
        <VideoSearchInput
          onChange={this.handleVideoSearch} />
        <VideoList loading={videoSearchLoading} videos={videos} listName={listName} />
      </div>
    )
  }
}
