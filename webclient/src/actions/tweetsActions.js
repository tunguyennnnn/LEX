export function fetchTweets () {
  return {
    type: 'FETCH_TWEETS_FULFILLED',
    payload: [
      {
        id: 12341243,
        text: 'hello world'
      }, {
        id: 12341244,
        text: 'hello foo'
      }, {
        id: 12341245,
        text: 'hello bar'
      }
    ]
  }
}

export function addTweet (id, text) {
  return {
    type: 'ADD_TWEET',
    payload: {
      id,
      text
    }
  }
}

export function updateTweet (id, text) {
  return {
    type: 'UPDATE_TWEET',
    payload: {
      id,
      text
    }
  }
}

export function deleteTweet (id) {
  return {
    type: 'DELETE_TWEET',
    payload: id
  }
}
