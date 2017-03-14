import * as ActionTypes from '../ActionTypes'

export default function reducer (state = [], action) {
  switch (action.type) {
    case ActionTypes.RECEIVED_MARKERS:
      return action.payload.markers
    case ActionTypes.CLEARED_MARKERS_RESULTS:
      return []
    default:
      return state
  }
}
