import * as ActionTypes from '../ActionTypes'
import { clearVideoResults } from '../actions/videoSearch'

export default action$ =>
  action$.ofType(ActionTypes.FETCH_VIDEOS_REQUEST)
    .filter(action => !!!action.payload.query)
    .map(clearVideoResults)
