import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import NavBar from '../components/NavBar'

export default class Layout extends React.Component {
  render () {
    return (
      <div>
        <NavBar />
        <MuiThemeProvider>
          <div class='container'>
            {this.props.children}
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}
