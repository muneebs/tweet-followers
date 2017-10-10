import { combineReducers } from 'redux'
import { UserTypes } from 'store/action_types/index'
import { initialRequestState, handleRequest } from './helpers/index'

function setFollowers(state = initialRequestState(), action) {
  return handleRequest(
    UserTypes.SET_FOLLOWERS_REQUEST,
    UserTypes.SET_FOLLOWERS_SUCCESS,
    UserTypes.SET_FOLLOWERS_FAILURE,
    state,
    action
  )
}

export default combineReducers({
  setFollowers
})
