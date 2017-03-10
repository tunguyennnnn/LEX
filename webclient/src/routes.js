import React from 'react'
import { Route, IndexRoute } from 'react-router'
import SearchVideo from './containers/SearchVideo'
import Player from './containers/Player'
import Layout from './containers/Layout'
import Account from './containers/Account'

export default (
  <Route path='/' component={Layout}>
    <IndexRoute component={SearchVideo} />
    <Route path='/video/:videoId' component={Player} />
    <Route path='/account' component={Account} />
  </Route>
)
