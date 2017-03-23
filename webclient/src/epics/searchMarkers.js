import * as ActionTypes from '../ActionTypes'
import { receiveMarkers } from '../actions/markerSearch'

import { Observable } from 'rxjs/Observable'
// import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/takeUntil'

export default function searchMarkers (action$) {
  const markers = [ {
    time: 12,
    text: 'this'
  }, {
    time: 156,
    text: 'is'
  }, {
    time: 213,
    text: 'so'
  }, {
    time: 278,
    text: 'cool'
  }, {
    time: 376,
    text: ':)'
  } ]

  return action$.ofType(ActionTypes.FETCH_MARKERS_REQUEST)
    .map(action => action.payload.query)
    .filter(q => !!q)
    .switchMap(q =>
      Observable.timer(800) // debounce
        .takeUntil(action$.ofType(ActionTypes.CLEARED_MARKERS_RESULTS))
        .do(() => console.info(`Performing query: "${q}"`))
        .mergeMap(() =>
          Observable.of(markers)
            .map(receiveMarkers)
        )
    )
}
