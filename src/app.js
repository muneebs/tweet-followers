/**
 * @flow
 */

import { configureStore, sagaMiddleware} from 'store'
import sagas from 'store/sagas'
import { getTweetsRequest } from 'store/actions/tweets'
import { logTweetsToConsole } from './store/utils/user_utils'

export default class App {
  store: () => any

  constructor() {
    // eslint-disable-next-line
    this.store = configureStore()

    // start the sagas
    sagaMiddleware.run(sagas)
  }

  start(): void {
    // dispatch the getTweetsRequest action with the command-line arguments
    this.store.dispatch(getTweetsRequest([`data/${process.argv[2]}`, `data/${process.argv[3]}`]))

    // since the saga is doing all the work to add the users, followers and tweets we should subscribe to changes
    // in the state and wait for the process to complete
    const unsubscribe = this.store.subscribe(() => {
      const tweetRequestStatus = this.store.getState().requests.tweets.getTweets.status
      if (tweetRequestStatus === 'success') {
        // no need to listen to changes anymore, so unsubscribe from the store
        unsubscribe()

        // fetch the users, their tweets and followers from the state
        const state = this.store.getState().entities.users
        logTweetsToConsole(state)
      }
    })
  }
}
