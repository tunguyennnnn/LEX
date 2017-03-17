import React from 'react'
import { Route, IndexRoute } from 'react-router'

import { Authenticated, NotAuthenticated } from './utils/auth'

import SearchVideo from './containers/SearchVideo'
import Player from './containers/Player'
import Layout from './containers/Layout'
import Account from './containers/Account'
import Login from './containers/LogIn'

export default (
  <Route path='/' component={Layout}>
    <IndexRoute component={SearchVideo} />
    <Route component={Authenticated}>
      <Route path='/video/:videoId' component={Player} />
      <Route path='/account' component={Account} />
    </Route>
    <Route component={NotAuthenticated}>
      <Route path='login' component={Login} />
    </Route>
  </Route>
)
