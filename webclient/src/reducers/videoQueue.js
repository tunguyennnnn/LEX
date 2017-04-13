import * as ActionTypes from '../ActionTypes'

const initialState = {
  queued: false,
  error: null
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.QUEUE_VIDEOS_REQUEST:
      return {
        ...state,
        queued: false
      }
    case ActionTypes.QUEUE_VIDEOS_SUCCESS:
      return {
        ...state,
        queued: true
      }
    case ActionTypes.QUEUE_VIDEOS_REJECTED:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}
