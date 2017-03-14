import React from 'react'
import { connect } from 'react-redux'

import { authentificate, logout } from '../actions/auth'

@connect((store) => ({
  isAuthenticated: store.auth.isAuthenticated,
  profile: store.auth.profile
}),
  { authentificate, logout }
)
export default class Account extends React.Component {
  render () {
    const { logout, profile } = this.props
    return (
      <ul class='list-inline'>
        <li><img src={profile.picture} height='40px' /></li>
        <li><span>Welcome, {profile.nickname}</span></li>
        <li><button onClick={logout}>Logout</button></li>
      </ul>
    )
  }
}
