import * as ActionTypes from '../ActionTypes'

export default function reducer (state = [], action) {
  switch (action.type) {
    case ActionTypes.FETCH_USER_REQUEST:
      return true
    case ActionTypes.FETCH_USER_SUCCESS:
      return true
    default:
      return state
  }
}
