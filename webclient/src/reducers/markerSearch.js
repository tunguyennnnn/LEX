import * as ActionTypes from '../ActionTypes'

const initialState = {
  markers: [],
  fetching: false,
  fetched: false,
  error: null
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_MARKERS_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case ActionTypes.FETCH_MARKERS_SUCCESS:
      return {
        ...state,
        markers: action.payload.markers,
        fetching: false,
        fetched: true
      }
    case ActionTypes.FETCH_MARKERS_REJECTED:
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: action.payload
      }
    case ActionTypes.CLEARED_MARKERS_RESULTS:
      return {
        ...state,
        markers: [],
        fetching: false
      }
    default:
      return state
  }
}
