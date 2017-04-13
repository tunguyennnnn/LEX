import * as ActionTypes from '../ActionTypes'

export function queueVideos (query) {
  console.log('queueing', query)
  return {
    type: ActionTypes.QUEUE_VIDEOS_REQUEST,
    payload: {
      query
    }
  }
}

export function queueVideosSuccess () {
  return {
    type: ActionTypes.QUEUE_VIDEOS_SUCCESS
  }
}
