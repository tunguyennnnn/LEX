import React from 'react'
import { Provider } from 'react-redux'
import routes from '../routes'
import { Router } from 'react-router'
import DevTools from './DevTools'

export default class Root extends React.Component {
  render () {
    const { store, history } = this.props
    if (process.env.NODE_ENV === 'production') {
      return (
        <Provider store={store}>
          <Router history={history} routes={routes} />
        </Provider>
      )
    } else {
      return (
        <Provider store={store}>
          <div>
            <Router history={history} routes={routes} />
            <DevTools />
          </div>
        </Provider>
      )
    }
  }
}
