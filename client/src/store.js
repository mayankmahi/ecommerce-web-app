import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userReducer } from './Reducers/userReducer'

const rootReducer = combineReducers({
  user: userReducer
})

const store = createStore(rootReducer, composeWithDevTools())

export default store
