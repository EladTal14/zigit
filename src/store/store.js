import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'

import { appReducer } from './appReducer.js'

const rootReducer = combineReducers({
  appModule: appReducer,

})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))