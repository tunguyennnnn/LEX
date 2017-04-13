import { combineEpics } from 'redux-observable'

import searchVideos from './searchVideos'
import clearVideoResults from './clearVideoResults'
import searchMarkers from './searchMarkers'
import clearMarkerResults from './clearMarkerResults'
import queueVideos from './queueVideos'
import user from './user'

export default combineEpics(
  searchVideos,
  clearVideoResults,
  searchMarkers,
  clearMarkerResults,
  queueVideos,
  user
)
