import { receiveVideos } from '../actions/videoSearchActions'
// import { ajax } from 'rxjs/observable/dom/ajax'

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
  const videos = [{
    id: 'YVeoKMLOSQ4',
    thumbnailUrl: 'https://i.cbc.ca/1.4007032.1488482101!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_620/the-edge-on-galaxy-ngc-1055.jpg',
    title: 'Play on Mars',
    duration: '2222'
  }, {
    id: '3BOgF_y_8CA',
    thumbnailUrl: 'https://s-media-cache-ak0.pinimg.com/originals/38/4a/95/384a9535ee7f589244041c6bc2186630.jpg',
    title: 'On the moon',
    duration: '1111'
  }, {
    id: 'aAqmr3E091Y',
    thumbnailUrl: 'http://popchassid.com/wp-content/uploads/2013/05/Earth-the-universe-stars-435.jpg',
    title: 'Stars everywhere',
    duration: '1234'
  }, {
    id: 'aHCtFbqr2Ng',
    thumbnailUrl: 'https://s-media-cache-ak0.pinimg.com/originals/38/4a/95/384a9535ee7f589244041c6bc2186630.jpg',
    title: 'On the moon',
    duration: '1111'
  }, {
    id: 'KmKN6nIDjAo',
    thumbnailUrl: 'http://popchassid.com/wp-content/uploads/2013/05/Earth-the-universe-stars-435.jpg',
    title: 'Stars everywhere',
    duration: '1234'
  }, {
    id: 'H2ZQalO6kMI',
    thumbnailUrl: 'http://popchassid.com/wp-content/uploads/2013/05/Earth-the-universe-stars-435.jpg',
    title: 'Stars everywhere',
    duration: '1234'
  }, {
    id: 'Ca_1jcuta2k',
    thumbnailUrl: 'http://scienceblogs.com/startswithabang/files/2013/02/2xcluster.jpg',
    title: 'Far from earth',
    duration: '8234'
  }]

  return action$.ofType('SEARCHED_VIDEOS')
    .map(action => action.payload.query)
    .filter(q => !!q)
    .switchMap(q =>
      Observable.timer(800) // debounce
        .takeUntil(action$.ofType('CLEARED_SEARCH_RESULTS'))
        .do(() => console.info(`Performing query: "${q}"`))
        .mergeMap(() =>
          Observable.of(videos)
            .do((f) => console.log(f))
            .map(receiveVideos)
        )
    )
};
