/* global localStorage Auth0Lock */
import * as ActionTypes from '../ActionTypes'

const lock = new Auth0Lock('nvLJm1LMmmocO3YFIj4OWVmqkOI9kzuM', 'saneod.auth0.com')

function loginSuccess (profile) {
  return {
    type: ActionTypes.LOGIN_USER_SUCCESS,
    profile
  }
}

function loginError (error) {
  return {
    type: ActionTypes.LOGIN_USER_FAILURE,
    error
  }
}

export function login () {
  // display the lock widget
  return dispatch => {
    lock.show()
  }
}

function logoutSuccess (profile) {
  return {
    type: ActionTypes.LOGOUT_USER
  }
}

export function logout () {
  return dispatch => {
    localStorage.removeItem('id_token')
    localStorage.removeItem('profile')
    return dispatch(logoutSuccess())
  }
}

export function authentificate () {
  return dispatch => {
    lock.on('authenticated', function (authResult) {
      lock.getProfile(authResult.idToken, function (error, profile) {
        if (error) {
          return dispatch(loginError(error))
        }

        localStorage.setItem('profile', JSON.stringify(profile))
        localStorage.setItem('id_token', authResult.idToken)
        return dispatch(loginSuccess(profile))
      })
    })
  }
}
