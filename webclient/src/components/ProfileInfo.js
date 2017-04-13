import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

export default class ProfileInfo extends React.Component {
  render () {
    const { profile, logout } = this.props

    return (
      <div>
        <h3>My Account</h3>
        <div>
          <span>Username:</span> {profile.nickname}
        </div>
        <div>
          <span>Profile Picture:</span> <img src={profile.picture} height='60px' />
        </div>
        <div>
          <RaisedButton onTouchTap={logout} label='Logout' type='button' primary />
        </div>
      </div>
    )
  }
}
