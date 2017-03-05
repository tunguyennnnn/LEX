import * as ActionTypes from '../ActionTypes'

export function receiveVideos (videos) {
  return {
    type: ActionTypes.RECEIVED_VIDEOS,
    payload: {
      videos
    }
  }
}

export function searchVideos (query) {
  return {
    type: ActionTypes.SEARCHED_VIDEOS,
    payload: {
      query
    }
  }
}

export function clearVideoResults () {
  return {
    type: ActionTypes.CLEARED_SEARCH_RESULTS
  }
}
