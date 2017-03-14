import React from 'react'

export default class LogIn extends React.Component {

  render () {
    const { onLoginClick, onLogoutClick, isAuthenticated, profile } = this.props
    return (
      <div style={{ marginTop: '10px' }}>
        { !isAuthenticated ? (
          <ul>
            <li><button onClick={onLoginClick}>Login</button></li>
          </ul>
        ) : (
          <ul class='list-inline'>
            <li><img src={profile.picture} height='40px' /></li>
            <li><span>Welcome, {profile.nickname}</span></li>
            <li><button onClick={onLogoutClick}>Logout</button></li>
          </ul>
        )}
      </div>
    )
  }
}
