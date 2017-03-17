import React from 'react'
import { connect } from 'react-redux'

import { login, authenticate } from '../actions/auth'

@connect((store) => ({
  isAuthenticated: store.auth.isAuthenticated
}),
  { login, authenticate }
)
export default class Login extends React.Component {
  constructor (props) {
    super(props)
    this.props.authenticate()
  }

  render () {
    const { login } = this.props
    return (
      <div>
        <button onClick={login}>Login</button>
      </div>
    )
  }
}
