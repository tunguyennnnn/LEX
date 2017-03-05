import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import logger from 'redux-logger'
import rootReducer from './reducers'
import rootEpic from './epics'

const epicMiddleware = createEpicMiddleware(rootEpic)

export default function configureStore () {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(
        logger
      )
    )
  )
  return store
}
