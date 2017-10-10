import { combineReducers } from 'redux'
import { TweetTypes } from 'store/action_types/index'
import { initialRequestState, handleRequest } from './helpers/index'

function getTweets(state = initialRequestState(), action) {
  return handleRequest(
    TweetTypes.GET_TWEETS_REQUEST,
    TweetTypes.GET_TWEETS_SUCCESS,
    TweetTypes.GET_TWEETS_FAILURE,
    state,
    action
  )
}

export default combineReducers({
  getTweets
})
