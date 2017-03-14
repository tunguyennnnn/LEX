import React from 'react'
import { connect } from 'react-redux'

import { login, authentificate, logout } from '../actions/auth'
import Auth from '../components/Auth'

@connect((store) => ({
  isAuthenticated: store.auth.isAuthenticated,
  profile: store.auth.profile
}),
  { login, authentificate, logout }
)
export default class LogIn extends React.Component {
  constructor (props) {
    super(props)
    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
    this.props.authentificate()
  }

  handleLoginClick () {
    this.props.login()
  }

  handleLogoutClick () {
    this.props.logout()
  }

  render () {
    const { isAuthenticated, profile } = this.props

    return (
      <Auth
        isAuthenticated={isAuthenticated}
        profile={profile}
        onLoginClick={this.handleLoginClick}
        onLogoutClick={this.handleLogoutClick}
      />
    )
  }
}
