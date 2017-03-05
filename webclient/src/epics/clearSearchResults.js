import { clearSearchResults } from '../actions/videoSearchActions'

export default action$ =>
  action$.ofType('SEARCHED_VIDEOS')
    .filter(action => !!!action.payload.query)
    .map(clearSearchResults)
