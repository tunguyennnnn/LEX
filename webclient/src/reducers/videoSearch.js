import * as ActionTypes from '../ActionTypes'

export default function reducer (state = false, action) {
  switch (action.type) {
    case ActionTypes.SEARCHED_VIDEOS:
      return true
    case ActionTypes.RECEIVED_VIDEOS:
    case ActionTypes.CLEARED_VIDEOS_RESULTS:
      return false
    default:
      return state
  }
}
