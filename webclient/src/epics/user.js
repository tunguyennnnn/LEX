/* global localStorage */
import * as ActionTypes from '../ActionTypes'
import { fetchedUser } from '../actions/user'

import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'

export default action$ => {
  return action$.ofType(ActionTypes.FETCH_USER_REQUEST)
    .mergeMap((action) => {
      console.log('action', action)
      let request = {
        url: '/api/auth',
        crossDomain: true,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('id_token')}`
        }
      }
      return ajax(request)
        .map(() => fetchedUser())
    })
}
