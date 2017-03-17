import * as ActionTypes from '../ActionTypes'

export function fetchedUser (user) {
  return {
    type: ActionTypes.FETCH_USER_SUCCESS,
    payload: {
      user
    }
  }
}

export function fetchUser (id) {
  return {
    type: ActionTypes.FETCH_USER_REQUEST
  }
}
