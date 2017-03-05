import * as ActionTypes from '../ActionTypes'

export default function reducer (state = [], action) {
  switch (action.type) {
    case ActionTypes.RECEIVED_VIDEOS:
      return action.payload.videos
    case ActionTypes.CLEARED_VIDEOS_RESULTS:
      return []
    default:
      return state
  }
}
