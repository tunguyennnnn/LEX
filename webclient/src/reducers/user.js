import * as ActionTypes from '../ActionTypes'

export default function reducer (state = [], action) {
  switch (action.type) {
    case ActionTypes.FETCH_USER_SUCCESS:
      return action.payload.user
    default:
      return state
  }
}
