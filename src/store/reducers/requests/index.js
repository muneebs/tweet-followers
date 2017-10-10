import { combineReducers } from 'redux'

import users from './users'
import tweets from './tweets'

export default combineReducers({
  users,
  tweets
})
