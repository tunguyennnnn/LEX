import { combineEpics } from 'redux-observable'
import searchVideos from './searchVideos'
import clearSearchResults from './clearSearchResults'

export default combineEpics(
  searchVideos,
  clearSearchResults
)
