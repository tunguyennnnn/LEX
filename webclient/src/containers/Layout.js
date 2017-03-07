import React from 'react'

import NavBar from '../components/NavBar'

export default class Layout extends React.Component {
  render () {
    return (
      <div>
        <NavBar />
        <div class='container'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
