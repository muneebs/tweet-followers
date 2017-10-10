/*
 * @flow
 */

import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import serviceReducer from './reducers'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware({
  onError : (error) => {
    console.log('saga error', error)
  }
})

// eslint-disable-next-line immutable/no-let
let middleware = [sagaMiddleware]

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
