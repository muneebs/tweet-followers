/* global describe, expect, it, jest */

import * as actions from 'store/actions/users'
import { UserTypes } from 'store/action_types'

describe('user actions test suit', () => {
  it('it should set FETCH_USERS_REQUEST state', () => {
    expect(actions.fetchUsersRequest()).toEqual({
      type : UserTypes.FETCH_USERS_REQUEST
    })
  })

  it('it should set FETCH_USERS_SUCCESS state', () => {
    expect(actions.fetchUsersSuccess()).toEqual({
      type : UserTypes.FETCH_USERS_SUCCESS
    })
  })

  it('it should set FETCH_USERS_FAILURE state', () => {
    const error = { error : 'some random error' }
    expect(actions.fetchUsersFailure(error)).toEqual({
      type : UserTypes.FETCH_USERS_FAILURE,
      error
    })
  })

  it('it should set ADD_USER state', () => {
    const user = {
      user : 'Wolly',
      followers : ['Plop']
    }
    expect(actions.addUser(user)).toEqual({
      type : UserTypes.ADD_USER,
      data : user
    })
  })

  it('it should get users and followers from string', () => {
    const str = 'Wolly follows Plop'
    expect(actions.getUsersAndFollowers(str)).toEqual(['Wolly', ['Plop']])
  })

  it('it should get the user and their tweets from string', () => {
    const str = 'Wolly> What a great day this has been...'
    expect(actions.getUserTweets(str)).toEqual({
      user : 'Wolly',
      tweets : ['What a great day this has been...']
    })
  })
})
