import * as ActionTypes from '../ActionTypes'

export default function reducer (state = false, action) {
  switch (action.type) {
    case ActionTypes.SEARCHED_MARKERS:
      return true
    case ActionTypes.RECEIVED_MARKERS:
    case ActionTypes.CLEARED_MARKERS_RESULTS:
      return false
    default:
      return state
  }
}
