import React from 'react'
import { connect } from 'react-redux'

import { login, authenticate } from '../actions/auth'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import NavBar from '../components/NavBar'

@connect((store) => ({
  isAuthenticated: store.auth.isAuthenticated,
  profile: store.auth.profile
}),
  { login, authenticate }
)
export default class Layout extends React.Component {
  constructor (props) {
    super(props)
    this.handleAuthenticate = this.handleAuthenticate.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleAuthenticate () {
    this.props.authenticate()
  }

  handleLogin () {
    this.props.login()
  }

  render () {
    const { profile, isAuthenticated } = this.props
    return (
      <div>
        <MuiThemeProvider>
          <span>
            <NavBar
              login={this.handleLogin}
              authenticate={this.handleAuthenticate}
              isAuthenticated={isAuthenticated}
              profile={profile} />
            <div class='container'>
              {this.props.children}
            </div>
          </span>
        </MuiThemeProvider>
      </div>
    )
  }
}
