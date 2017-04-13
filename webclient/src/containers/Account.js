import React from 'react'
import { connect } from 'react-redux'

import ProfileInfo from '../components/ProfileInfo'
import QueueVideo from '../components/QueueVideo'

import { logout } from '../actions/auth'

import { queueVideos } from '../actions/videoQueue'

@connect((store) => ({
  profile: store.auth.profile
}),
  { logout, queueVideos }
)
export default class Account extends React.Component {
  constructor (props) {
    super(props)
    this.handleQueueVideos = this.handleQueueVideos.bind(this)
  }

  handleQueueVideos (query) {
    console.log('queueing videos', query)
    this.props.queueVideos({query: query})
  }

  render () {
    const { logout, profile } = this.props
    return (
      <div>
        <ProfileInfo profile={profile} logout={logout} />
        <div class='clearfix' />
        <QueueVideo queueVideos={this.handleQueueVideos} />
      </div>
    )
  }
}
