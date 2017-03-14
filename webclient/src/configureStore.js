import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import rootEpic from './epics'

const epicMiddleware = createEpicMiddleware(rootEpic)

export default function configureStore () {
  const routingMiddleware = routerMiddleware(browserHistory)
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(
        logger(),
        epicMiddleware,
        thunk,
        routingMiddleware
      )
    )
  )
  return store
}
