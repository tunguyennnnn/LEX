import React from 'react'
import { connect } from 'react-redux'

import { searchVideos } from '../actions/videoSearchActions'

import VideoSearchInput from './VideoSearchInput'
import VideoList from './VideoList'

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

  // componentDidMount () {
  //   this.handleVideoSearch(this.props.query)
  // }

  // componentWillReceiveProps (nextProps) {
  //   if (this.props.query !== nextProps.query) {
  //     this.handleVideoSearch(nextProps.query)
  //   }
  // }

  handleVideoSearch (query) {
    this.props.searchVideos(query)
  }

  render () {
    console.log(this.props)
    const { videos, videoSearchLoading } = this.props

    const listName = 'recents'

    return (
      <div>
        <VideoSearchInput
          onChange={this.handleVideoSearch} />
        <VideoList loading={videoSearchLoading} videos={videos} listName={listName} />
      </div>
    )
  }
}
