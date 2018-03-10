import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import dogRateReducer from './dog-rate-reducer'
import errorMessageReducer from './error-message-reducer'

export default combineReducers({
  routing: routerReducer,
  dogRate: dogRateReducer,
  errorMessage: errorMessageReducer
})
