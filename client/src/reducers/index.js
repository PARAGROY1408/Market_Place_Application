import {combineReducers} from 'redux'
import {authReducer} from './auth.js'

// here we will contain the rootReducer that has all the reducers
// as we could have multiple reducer so we need to combine all of them with the help of combineReducers
// we will pass the reducers in the form of js object to the combineReducers
const rootReducer=combineReducers({
    auth:authReducer 
  })

export default rootReducer