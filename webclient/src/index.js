import 'babel-polyfill'
import 'video.js/dist/video-js.css'
import './styles/video.css'
import 'videojs-markers/dist/videojs.markers.css'
import './styles/index.css'
import './styles/videolist.css'
import './styles/markerlist.css'
import './styles/navbar.css'

import 'videojs-youtube/dist/Youtube.js'
import 'videojs-markers/dist/videojs-markers.js'

import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { AppContainer } from 'react-hot-loader'
import Root from './containers/Root'

import configureStore from './configureStore'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

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
