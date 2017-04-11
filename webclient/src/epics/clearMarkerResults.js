import * as ActionTypes from '../ActionTypes'
import { clearMarkersResults } from '../actions/markerSearch'

export default action$ =>
  action$.ofType(ActionTypes.FETCH_MARKERS_REQUEST)
    .filter(action => !!!action.payload.query)
    .map(clearMarkersResults)
