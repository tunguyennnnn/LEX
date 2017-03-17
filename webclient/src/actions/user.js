import * as ActionTypes from '../ActionTypes'

export function fetchedUser () {
  return {
    type: ActionTypes.FETCH_USER_SUCCESS
  }
}

export function fetchUser (id) {
  return {
    type: ActionTypes.FETCH_USER_REQUEST
  }
}
