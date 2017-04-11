import * as ActionTypes from '../ActionTypes'

const initialState = {
  user: null,
  fetching: false,
  fetched: false,
  error: null
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_USER_REQUEST:
      return {
        ...state,
        fetching: true
      }
    case ActionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        user: action.payload.user
      }
    case ActionTypes.FETCH_USER_REJECTED:
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    default:
      return state
  }
}
