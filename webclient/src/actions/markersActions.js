export function fetchMarkers () {
  return {
    type: 'FETCH_MARKERS_FULFILLED',
    payload: [ {
      time: 45,
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
  }
}

export function cleanMarkers () {
  return {type: 'CLEAN_MARKERS'}
}

export function markersLoaded () {
  return {
    type: 'MARKERS_LOADED',
    payload: true
  }
}
