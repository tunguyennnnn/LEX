import * as ActionTypes from '../ActionTypes'

export function receiveVideos (videos) {
  return {
    type: ActionTypes.FETCH_VIDEOS_SUCCESS,
    payload: {
      videos
    }
  }
}

export function searchVideos (query) {
  return {
    type: ActionTypes.FETCH_VIDEOS_REQUEST,
    payload: {
      query
    }
  }
}

export function clearVideoResults () {
  return {
    type: ActionTypes.CLEARED_VIDEOS_RESULTS
  }
}
