import * as ActionTypes from '../ActionTypes'

export function receiveMarkers (markers) {
  return {
    type: ActionTypes.RECEIVED_MARKERS,
    payload: {
      markers
    }
  }
}

export function searchMarkers (query) {
  return {
    type: ActionTypes.SEARCHED_MARKERS,
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
