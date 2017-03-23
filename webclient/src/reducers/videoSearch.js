import * as ActionTypes from '../ActionTypes'

const initialState = {
  videos: [],
  fetching: false,
  fetched: false,
  error: null
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_VIDEOS_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case ActionTypes.FETCH_VIDEOS_SUCCESS:
      return {
        ...state,
        videos: action.payload.videos,
        fetching: false,
        fetched: true
      }
    case ActionTypes.FETCH_VIDEOS_REJECTED:
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    case ActionTypes.CLEARED_VIDEOS_RESULTS:
      return {
        ...state,
        videos: [],
        fetching: false
      }
    default:
      return state
  }
}
