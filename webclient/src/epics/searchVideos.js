/* global localStorage */
import * as ActionTypes from '../ActionTypes'
import { receiveVideos } from '../actions/videoSearch'
import { ajax } from 'rxjs/observable/dom/ajax'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/takeUntil'

export default function searchVideos (action$) {
  return action$.ofType(ActionTypes.SEARCHED_VIDEOS)
    .map(action => action.payload.query)
    .filter(q => {
      return !!q
    })
    .switchMap(q =>
      Observable.timer(800) // debounce
        .takeUntil(action$.ofType(ActionTypes.CLEARED_VIDEOS_RESULTS))
        .mergeMap(() => {
          let request = {
            url: '/api/videos',
            crossDomain: true,
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('id_token')}`
            }
          }
          return ajax(request)
            .map(v => v.response)
            .map(receiveVideos)
        })
    )
};
