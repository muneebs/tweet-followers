import Backend from './Backend'
import CONFIG from 'config'
import { readFile } from 'utils'

declare type Options = {
  url : ?string,
  method : ?string,
  path : ?string
}

class TweetBackend extends Backend {
  initialize() {
    this.API_BASE_URL = CONFIG.backend.local ?
      CONFIG.Tweets.local.apiUrl : CONFIG.Tweets.remote.apiUrl
  }

  getTweets() {
    return this._fetch({
      path : '/tweet.txt'
    })
  }

  getUsers() {
    return this._fetch({
      path : '/user.txt'
    })
  }

  _fetch(opts: Options) {
    if (opts.path !== null) {
      return readFile(this.API_BASE_URL + opts.path)
    }

    // TODO - implement HTTP request - this is just to demonstrate that the backend could
    // read data from the network instead of the local file provided for the
    // assignment.
    return Promise.resolve()
  }
}

const tweetBackend = new TweetBackend()
export default tweetBackend
