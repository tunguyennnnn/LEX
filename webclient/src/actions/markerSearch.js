import * as ActionTypes from '../ActionTypes'

export function receiveMarkers (markers) {
  return {
    type: ActionTypes.FETCH_MARKERS_SUCCESS,
    payload: {
      markers
    }
  }
}

export function searchMarkers (query) {
  return {
    type: ActionTypes.FETCH_MARKERS_REQUEST,
    payload: {
      query
    }
  }
}

export function clearMarkersResults () {
  return {
    type: ActionTypes.CLEARED_MARKERS_RESULTS
  }
}
