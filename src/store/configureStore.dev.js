/*
 * @flow
 */

import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createLogger from 'redux-node-logger'
import createSagaMiddleware from 'redux-saga'
import serviceReducer from './reducers'

const logger = createLogger()

// create the saga middleware
const sagaMiddleware = createSagaMiddleware({
  onError : (error) => {
    console.log('saga error', error)
  }
})

// eslint-disable-next-line immutable/no-let
let middleware = [sagaMiddleware, logger]

function createReducer(...reducers) {
  return combineReducers(Object.assign({}, ...reducers))
}

/**
 * ## configureStore
 * @param {Object} appReducer -
 * @return {Object} store
 */
export function configureStore(appReducer) {
  return createStore(createReducer(serviceReducer, appReducer),
    // eslint-disable-next-line no-undefined
    undefined, compose(applyMiddleware(...middleware)))
}

export { sagaMiddleware }
