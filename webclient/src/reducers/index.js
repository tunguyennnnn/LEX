import { combineReducers } from 'redux'

import tweets from './tweetsReducer'
import user from './userReducer'
import markers from './markersReducer'
import videoResults from './videoResultsReducer'
import videoSearch from './videoSearchReducer'

export default combineReducers({
  tweets,
  user,
  markers,
  videoResults,
  videoSearch
})
