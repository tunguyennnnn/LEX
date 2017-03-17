/* global localStorage */
import Auth0Lock from 'auth0-lock'

import { push } from 'react-router-redux'

import { fetchUser } from './user'

import * as ActionTypes from '../ActionTypes'

const lockOptions = {
  theme: {
    primaryColor: '#00bcd4',
    logo: ''
    // logo: 'http://www.imageno.com/thumbs/20170316/zepi688n09yn.jpg'
  },
  languageDictionary: {
    title: 'LEX'
  }
}
const lock = new Auth0Lock('nvLJm1LMmmocO3YFIj4OWVmqkOI9kzuM', 'saneod.auth0.com', lockOptions)

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
    dispatch(push('/'))
    return dispatch(logoutSuccess())
  }
}

export function authenticate () {
  return dispatch => {
    lock.on('authenticated', function (authResult) {
      lock.getProfile(authResult.idToken, function (error, profile) {
        if (error) {
          return dispatch(loginError(error))
        }

        localStorage.setItem('profile', JSON.stringify(profile))
        localStorage.setItem('id_token', authResult.idToken)
        dispatch(loginSuccess(profile))
        return dispatch(fetchUser())
      })
    })
    lock.on('hide', function () {
      console.warn('lock was hidden')
      return dispatch(push('/'))
    })
  }
}
