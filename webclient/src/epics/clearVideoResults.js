import * as ActionTypes from '../ActionTypes'
import { clearVideoResults } from '../actions/videoSearch'

export default action$ =>
  action$.ofType(ActionTypes.SEARCHED_VIDEOS)
    .filter(action => !!!action.payload.query)
    .map(clearVideoResults)
