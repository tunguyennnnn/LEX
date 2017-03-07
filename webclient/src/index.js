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
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import SearchVideo from './containers/SearchVideo'
import Player from './containers/Player'
import Layout from './containers/Layout'
import configureStore from './configureStore'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={Layout}>
        <IndexRoute component={SearchVideo} />
        <Route path='/video/:videoId' component={Player} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
