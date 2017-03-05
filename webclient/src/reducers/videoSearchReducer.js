export default function reducer (state = false, action) {
  switch (action.type) {
    case 'SEARCHED_USERS':
      return true
    case 'RECEIVED_USERS':
    case 'CLEARED_SEARCH_RESULTS':
      return false
    default:
      return state
  }
}
