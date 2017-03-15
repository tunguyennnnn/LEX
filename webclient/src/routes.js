import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { UserAuthWrapper } from 'redux-auth-wrapper'
import { routerActions } from 'react-router-redux'

import SearchVideo from './containers/SearchVideo'
import Player from './containers/Player'
import Layout from './containers/Layout'
import Account from './containers/Account'
import LogIn from './containers/LogIn'

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth,
  predicate: auth => auth.isAuthenticated,
  failureRedirectPath: '/login',
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'UserIsAuthenticated'
})

export default (
  <Route path='/' component={Layout}>
    <IndexRoute component={SearchVideo} />
    <Route path='/login' component={LogIn} />
    <Route path='/video/:videoId' component={UserIsAuthenticated(Player)} />
    // <Route path='/video/:videoId' component={Player} />
    <Route path='/account' component={UserIsAuthenticated(Account)} />
  </Route>
)
