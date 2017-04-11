import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

// import markers from './markersReducer'
import videoSearch from './videoSearch'
import markerSearch from './markerSearch'
import auth from './auth'
import user from './user'

export default combineReducers({
  auth: auth,
  user: user,
  videoSearch,
  markerSearch,
  routing,
  form: formReducer
})
