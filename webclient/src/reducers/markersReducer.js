export default function reducer (state = {
  markers: [],
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case 'FETCH_MARKERS': {
      return {...state, fetching: true}
    }
    case 'CLEAN_MARKERS': {
      return {...state, markers: []}
    }
    case 'FETCH_MARKERS_REJECTED': {
      return {...state, fetching: false, error: action.payload}
    }
    case 'FETCH_MARKERS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        markers: action.payload
      }
    }
  }
  return state
}
