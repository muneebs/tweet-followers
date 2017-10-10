import { UserTypes } from 'store/action_types'
import { List, Map } from 'immutable'
import { isEmpty } from 'lodash'

export default function index(state = List(), action) {
  switch (action.type) {
    case UserTypes.ADD_USER: {
      const data = action.data || action.payload
      const hasUser = state.find((v) => {
        return v.user === data.user
      })
      if (hasUser) {
        return state.update(state.findIndex((item) => {
          return item.user === data.user
        }), (item) => {
          return {
            ...item,
            followers : List(Map(item)
              .get('followers'))
              .push(data.followers)
              .skipWhile(x => {
                return isEmpty(x)
              })
              .toSet()
              .toList(),
            tweets : List()
          }
        }).sortBy((user) => {
          return user.user
        })
      }
      return state.push(data).sortBy((user) => {
        return user.user
      })
    }
    case UserTypes.ADD_USER_TWEET: {
      const data = action.data || action.payload
      return state.update(state.findIndex((item) => {
        return item.user === data.user
      }), (item) => {
        return {
          ...item,
          tweets : List(Map(item).get('tweets')).push(data.tweet)
        }
      })
    }
  }
  return state
}
