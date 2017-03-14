import React from 'react'
import { connect } from 'react-redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import NavBar from '../components/NavBar'

@connect((store) => ({
  isAuthenticated: store.auth.isAuthenticated,
  profile: store.auth.profile
}))
export default class Layout extends React.Component {
  render () {
    const { profile, isAuthenticated } = this.props
    return (
      <div>
        <MuiThemeProvider>
          <span>
          <NavBar isAuthenticated={isAuthenticated} profile={profile} />
          <div class='container'>
            {this.props.children}
          </div>
          </span>
        </MuiThemeProvider>
      </div>
    )
  }
}
