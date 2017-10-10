/**
 * @flow
 */

export function logTweetsToConsole(users: Array): void {
  users.forEach(user => {
    console.log(user.user)
    user.tweets.forEach(tweet => {
      console.log(`\t @${user.user}: ${tweet}`)
    })
    user.followers.forEach(follower => {
      const f = users.find(u => {
        return u.user === follower
      })
      f.tweets.forEach(tweet => {
        console.log(`\t @${f.user}: ${tweet}`)
      })
    })
  })
}
