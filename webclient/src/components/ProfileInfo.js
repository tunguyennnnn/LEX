import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

export default class ProfileInfo extends React.Component {
  render () {
    const { profile, logout } = this.props

    return (
      <div class='profile-info'>
        <div>
          <h1 style={{marginTop: 0}}>Profile</h1>
          <span style={{fontSize: 1.4 + 'em'}}>Welcome back {profile.nickname}</span>
        </div>
        <div class='profile-info-right'>
          <RaisedButton onTouchTap={logout} label='Logout' type='button' primary />
        </div>
      </div>
    )
  }
}
