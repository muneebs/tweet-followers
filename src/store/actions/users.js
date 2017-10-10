import { UserTypes } from 'store/action_types'
import { readFile } from '../../utils/index'

export const fetchUsersRequest = () => {
  return {
    type : UserTypes.FETCH_USERS_REQUEST
  }
}

export const fetchUsersSuccess = () => {
  return {
    type : UserTypes.FETCH_USERS_SUCCESS
  }
}

export const fetchUsersFailure = (error: Object) => {
  return {
    type : UserTypes.FETCH_USERS_FAILURE,
    error
  }
}

export const fetchUsers = (file: string) => {
  return readFile(file)
}

export const addUser = (data) => {
  return {
    type : UserTypes.ADD_USER,
    data
  }
}

export const getUsersAndFollowers = (data: string) => {
  const users = data.split('follows').map(str => {
    return str.trim()
  })
  return [users[0], users[1].split(',').map(str => {
    return str.trim()
  })]
}

export const getUserTweets = (data: string) => {
  const users = data.split('>').map(str => {
    return str.trim()
  })
  return {
    user : users[0],
    tweets : [users[1]]
  }
}
