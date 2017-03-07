import React from 'react'
import { Route, IndexRoute } from 'react-router'
import SearchVideo from './containers/SearchVideo'
import Player from './containers/Player'
import Layout from './containers/Layout'

export default (
  <Route path='/' component={Layout}>
    <IndexRoute component={SearchVideo} />
    <Route path='/video/:videoId' component={Player} />
  </Route>
)
