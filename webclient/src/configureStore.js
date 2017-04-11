import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import thunk from 'redux-thunk'
import DevTools from './containers/DevTools'

import rootReducer from './reducers'
import rootEpic from './epics'

const epicMiddleware = createEpicMiddleware(rootEpic)

export default function configureStore (initialState) {
  const routingMiddleware = routerMiddleware(browserHistory)
  let enhancer = {}
  if (process.env.NODE_ENV === 'production') {
    enhancer = compose(
        applyMiddleware(
          epicMiddleware,
          thunk,
          routingMiddleware
        )
      )
  } else {
    enhancer = compose(
        applyMiddleware(epicMiddleware, thunk, routingMiddleware),
        DevTools.instrument()
      )
  }
  return createStore(
    rootReducer,
    initialState,
    enhancer
  )
}
