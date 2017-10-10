/**
 * @flow
 */

import { TweetTypes } from 'store/action_types'
import { readFile } from '../../utils/index'

export const getTweetsRequest = (files: Array) => {
  return {
    type : TweetTypes.GET_TWEETS_REQUEST,
    files
  }
}

export const getTweetsSuccess = (data: Array) => {
  return {
    type : TweetTypes.GET_TWEETS_SUCCESS,
    data
  }
}

export const getTweetsFailure = (error: Object) => {
  return {
    type : TweetTypes.GET_TWEETS_FAILURE,
    error
  }
}

export const getTweets = async(file: string) => {
  return readFile(file)
}
