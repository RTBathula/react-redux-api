import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import company from './company'

const rootReducer = combineReducers({
   company,
   routing: routerReducer
})

export default rootReducer
