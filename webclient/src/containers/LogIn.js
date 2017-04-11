import React from 'react'
import { connect } from 'react-redux'

import { login, authenticate } from '../actions/auth'

@connect((store) => ({
  isAuthenticated: store.auth.isAuthenticated
}),
  { login, authenticate }
)
export default class Login extends React.Component {

  componentDidMount () {
    this.props.login()
  }

  render () {
    return (
      <div>
      </div>
    )
  }
}
