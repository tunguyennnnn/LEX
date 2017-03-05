export function receiveVideos (videos) {
  return {
    type: 'RECEIVED_VIDEOS',
    payload: {
      videos
    }
  }
}

export function searchVideos (query) {
  return {
    type: 'SEARCHED_VIDEOS',
    payload: {
      query
    }
  }
}

export function clearSearchResults () {
  return {
    type: 'CLEARED_SEARCH_RESULTS'
  }
}
