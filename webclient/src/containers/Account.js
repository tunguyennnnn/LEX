import React from 'react'
import { connect } from 'react-redux'

import { logout } from '../actions/auth'
import { fetchUser } from '../actions/user'

@connect((store) => ({
  profile: store.auth.profile
}),
  { logout, fetchUser }
)
export default class Account extends React.Component {
  render () {
    const { logout, profile, fetchUser } = this.props
    return (
      <div>
        <ul class='list-inline'>
          <li><img src={profile.picture} height='40px' /></li>
          <li><span>Welcome, {profile.nickname}</span></li>
          <li><button onClick={logout}>Logout</button></li>
          <li><button onClick={fetchUser}>Fetch User</button></li>
        </ul>
      </div>
    )
  }
}
