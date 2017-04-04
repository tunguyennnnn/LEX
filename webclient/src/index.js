import 'babel-polyfill'
import './styles/index.css'
import './styles/videolist.css'
import './styles/markerlist.css'

import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import injectTapEventPlugin from 'react-tap-event-plugin'

import { AppContainer } from 'react-hot-loader'
import Root from './containers/Root'

import configureStore from './configureStore'

const store = configureStore()

const history = syncHistoryWithStore(browserHistory, store)

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NewRoot = require('./containers/Root').default
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
