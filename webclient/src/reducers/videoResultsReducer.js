export default function reducer (state = [], action) {
  switch (action.type) {
    case 'RECEIVED_VIDEOS':
      return action.payload.videos
    case 'CLEARED_SEARCH_RESULTS':
      return []
    default:
      return state
  }
}
