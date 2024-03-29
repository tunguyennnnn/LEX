import { UserAuthWrapper } from 'redux-auth-wrapper'
import { replace } from 'react-router-redux'
import { login } from '../actions/auth'

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth,
  authenticatingSelector: state => state.auth.isAuthenticated,
  predicate: auth => auth.isAuthenticated,
  failureRedirectPath: (state, ownProps) => '/',
  redirectAction: login,
  wrapperDisplayName: 'UserIsAuthenticated'
})

const UserIsNotAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth,
  predicate: auth => !auth.isAuthenticated,
  failureRedirectPath: (state, ownProps) => ownProps.location.query.redirect || '/',
  redirectAction: (newLoc) => (dispatch) => {
    dispatch(replace(newLoc))
  },
  allowRedirectBack: false,
  wrapperDisplayName: 'UserIsNotAuthenticated'
})

// const UserIsAuthenticated = UserAuthWrapper({
//   authSelector: state => state.auth,
//   predicate: auth => auth.isAuthenticated,
//   failureRedirectPath: '/login',
//   redirectAction: push,
//   wrapperDisplayName: 'UserIsAuthenticated'
// })

export const Authenticated = UserIsAuthenticated((props) => props.children)
export const NotAuthenticated = UserIsNotAuthenticated((props) => props.children)
