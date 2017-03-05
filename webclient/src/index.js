import 'video.js/dist/video-js.css'
import './styles/video.css'
import 'videojs-markers/dist/videojs.markers.css'
import './styles/index.css'
import './styles/videolist.css'

import 'videojs-youtube/dist/Youtube.js'
import 'videojs-markers/dist/videojs-markers.js'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, hashHistory } from 'react-router'

import SearchVideo from './components/SearchVideo'
import Video from './components/Video'
import configureStore from './configureStore'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={SearchVideo} />
      <Route path='/video/:videoId' component={Video} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
