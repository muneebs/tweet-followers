/* global describe, expect, it, jest */

import * as actions from 'store/actions/tweets'
import { TweetTypes } from 'store/action_types'

describe('tweets actions test suit', () => {
  it('it should set GET_TWEETS_REQUEST state', () => {
    expect(actions.getTweetsRequest(['file1.txt', 'file2.txt'])).toEqual({
      type : TweetTypes.GET_TWEETS_REQUEST,
      files : ['file1.txt', 'file2.txt']
    })
  })

  it('it should set GET_TWEETS_SUCCESS state', () => {
    const tweets = ['My first tweet', 'Hello world']
    expect(actions.getTweetsSuccess(tweets)).toEqual({
      type : TweetTypes.GET_TWEETS_SUCCESS,
      data : tweets
    })
  })

  it('it should set GET_TWEETS_FAILURE state', () => {
    const error = { error : 'some random error' }
    expect(actions.getTweetsFailure(error)).toEqual({
      type : TweetTypes.GET_TWEETS_FAILURE,
      error
    })
  })
})
