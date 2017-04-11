/* global localStorage */
import * as ActionTypes from '../ActionTypes'
const jwtDecode = require('jwt-decode')

function checkTokenExpiry () {
  let jwt = localStorage.getItem('id_token')
  if (jwt) {
    let jwtExp = jwtDecode(jwt).exp
    let expiryDate = new Date(0)
    expiryDate.setUTCSeconds(jwtExp)

    if (new Date() < expiryDate) {
      return true
    }
  }
  return false
}

function getProfile () {
  return JSON.parse(localStorage.getItem('profile'))
}

const initialState = {
  isAuthenticated: checkTokenExpiry(),
  profile: getProfile(),
  error: ''
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticated: true,
        profile: action.profile,
        error: ''
      })
    case ActionTypes.LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
        isAuthenticated: false,
        profile: null,
        error: action.error
      })
    case ActionTypes.LOGOUT_USER:
      return Object.assign({}, state, {
        isAuthenticated: false,
        profile: null
      })
    default:
      return state
  }
}
