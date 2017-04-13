import React from 'react'

import VideoQueueUpForm from '../components/VideoQueueUpForm'

export default class Account extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (values) {
    const query = {
      video_url: [values.youtubeurl]
    }
    this.props.queueVideos({query: query})
  }

  render () {
    return (
      <div>
        <h4>Add a new Video</h4>
        <VideoQueueUpForm onSubmit={this.handleSubmit} />
      </div>
    )
  }
 }
