/* global Auth0Lock localStorage */
import * as ActionTypes from '../ActionTypes'
const lock = new Auth0Lock('nvLJm1LMmmocO3YFIj4OWVmqkOI9kzuM', 'saneod.auth0.com')

import { logoutSuccess, loginSuccess, loginError } from '../actions/auth'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'

export function login (action$) {
  return action$.ofType(ActionTypes.LOGIN_USER_REQUEST)
    .map(() => lock.show())
}

export function logout (action$) {
  return action$.ofType(ActionTypes.LOGOUT_USER_REQUEST)
    .do(() => {
      localStorage.removeItem('id_token')
      localStorage.removeItem('profile')
    })
    .map(() => logoutSuccess)
}

export function authentificate (action$) {
  return action$.ofType(ActionTypes.AUTHENTIFICATE_USER_REQUEST)
    .mergeMap(() =>
      Observable.fromEvent(lock, 'authentificated')
        .do((authResult) => {
          lock.getProfile(authResult.idToken, (error, profile) => {
            if (error) {
              return loginError(error)
            }

            localStorage.setItem('profile', JSON.stringify(profile))
            localStorage.setItem('id_token', authResult.idToken)
            return loginSuccess(profile)
          })
        })
    )
}
