import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

// import markers from './markersReducer'
import videoResults from './videoResults'
import videoSearch from './videoSearch'
import markerResults from './markerResults'
import markerSearch from './markerSearch'

export default combineReducers({
  videoResults,
  videoSearch,
  markerResults,
  markerSearch,
  routing
})
