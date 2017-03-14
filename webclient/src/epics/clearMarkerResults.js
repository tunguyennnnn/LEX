import * as ActionTypes from '../ActionTypes'
import { clearMarkersResults } from '../actions/markerSearch'

export default action$ =>
  action$.ofType(ActionTypes.SEARCHED_MARKERS)
    .filter(action => !!!action.payload.query)
    .map(clearMarkersResults)
