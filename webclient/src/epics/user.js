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
        .map(fetchedUser)
    })
}
