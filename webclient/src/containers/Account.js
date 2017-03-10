import React from 'react'

import SignUpForm from '../components/SignUpForm'

export default class Account extends React.Component {
  handleSubmit = (values) => {
    // Do something with the form values
    console.log(values)
  }
  render () {
    return (
      <SignUpForm onSubmit={this.handleSubmit} />
    )
  }
}
