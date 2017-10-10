/**
 * @flow
 */

import { all, fork, takeLatest, take, put, call, select } from 'redux-saga/effects'
import { TweetTypes, UserTypes } from 'store/action_types'
import * as tweetActions from 'store/actions/tweets'
import * as userActions from 'store/actions/users'
import Immutable from 'immutable'

const fetchUsers = function *fetchUsers(file: string): Generator<*, *, *> {
  try {
    yield put(userActions.fetchUsersRequest())

    const data = yield userActions.fetchUsers(file)
    const usersAndFollowers = data.split('\r\n').slice(0, 3)
    const usersFollowers = yield all(usersAndFollowers.map(function *(value) {
      const [follower, users] = yield call(userActions.getUsersAndFollowers, value)
      // add users
      yield users.map(function *(user) {
        yield put(userActions.addUser({
          user : user,
          followers : [],
          tweets : []
        }))
      })
      // add followers as users
      yield put(userActions.addUser({
        user : follower,
        followers : [],
        tweets : []
      }))
      return {
        user : follower,
        follower : users
      }
    }))

    // add each users followers
    yield all(usersFollowers.map(function *(value) {
      yield value.follower.map(function *(f) {
        return yield put(userActions.addUser({
          user : value.user,
          followers : f
        }))
      })
    }))

    // end the saga task
    yield put(userActions.fetchUsersSuccess())
  } catch (error) {
    console.error(error)
    yield put(userActions.fetchUsersFailure(error))
  }
}

const getTweets = function *getTweets(args: Object): Generator<*, *, *> {
  try {
    const userFile = Immutable.List(args.files).find(file => {
      return file.indexOf('user.txt') !== -1
    })
    const tweetFile = Immutable.List(args.files).find(file => {
      return file.indexOf('tweet.txt') !== -1
    })

    if (!userFile || !tweetFile) {
      throw new Error('no input files provided.')
    }

    // get all the users and their followers
    yield fork(fetchUsers, userFile)
    // wait for the process to complete
    yield take(UserTypes.FETCH_USERS_SUCCESS)

    const tweets = yield call(tweetActions.getTweets, tweetFile)
    const tweetArray = tweets.split('\r\n').slice(0, 3)
    const userTweets = yield all(tweetArray.map(function *(value) {
      return yield call(userActions.getUserTweets, value)
    }))

    yield all(userTweets.map(function *(value) {
      yield put({
        type : UserTypes.ADD_USER_TWEET,
        data : {
          user : value.user,
          tweet : value.tweets
        }
      })
    }))

    yield put(tweetActions.getTweetsSuccess([]))
  } catch (error) {
    yield put(tweetActions.getTweetsFailure(error))
  }
}

const getTweetsRequestWatcher = function *getTweetsRequestWatcher(): Generator<*, *, *> {
  yield takeLatest(TweetTypes.GET_TWEETS_REQUEST, getTweets)
}

const rootSaga = function *root(): Generator<*, *, *> {
  yield (all([
    fork(getTweetsRequestWatcher)
  ]))
}

export default rootSaga
