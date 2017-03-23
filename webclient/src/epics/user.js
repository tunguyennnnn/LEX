/* global localStorage */
import * as ActionTypes from '../ActionTypes'
import { fetchedUser } from '../actions/user'

import { Observable } from 'rxjs/Observable'
import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/mergeMap'

export default action$ => {
  return action$.ofType(ActionTypes.FETCH_USER_REQUEST)
    .mergeMap((action) => {
      let request = {
        url: '/api/users',
        crossDomain: true,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('id_token')}`
        }
      }
      return ajax(request)
        .do((resp) => console.log('resp: ', resp))
        .map((resp) => resp.response)
        .map(response => fetchedUser(response))
        .catch(error => Observable.of({
          type: ActionTypes.FETCH_USER_REJECTED,
          payload: {
            status: error.xhr.status,
            response: error.xhr.response
          }
        }))
    })
}
