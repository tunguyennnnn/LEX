/* global localStorage */
import * as ActionTypes from '../ActionTypes'
import { queueVideosSuccess } from '../actions/videoQueue'
import { ajax } from 'rxjs/observable/dom/ajax'
import { startSubmit, stopSubmit } from 'redux-form'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/filter'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/takeUntil'

export default function queueVideos (action$, { getState, dispatch }) {
  return action$.ofType(ActionTypes.QUEUE_VIDEOS_REQUEST)
    .do(dispatch(startSubmit('videoQueueUp')))
    .map(action => action.payload.query.query.query)
    .mergeMap((query) => {
      console.log(query)
      console.log(query.video_url)
      let request = {
        url: '/api/videos/queue',
        responseType: 'json',
        method: 'POST',
        body: query,
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('id_token')}`
        }
      }
      return ajax(request)
        .map(v => v.response)
        .map(response => {
          stopSubmit('videoQueueUp', {})
          return queueVideosSuccess()
        })
        .catch(error => {
          dispatch(stopSubmit('videoQueueUp', {youtubeurl: `${error.xhr.status}: ${error.xhr.response}`}))
          return Observable.of({
            type: ActionTypes.QUEUE_VIDEOS_REJECTED,
            payload: {
              status: error.xhr.status,
              response: error.xhr.response
            }
          })
        })
    })
};
