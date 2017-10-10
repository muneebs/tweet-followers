import CONFIG from 'config'
import tweetBackend from './TweetBackend'

export default function BackendFactory() {
  if (CONFIG.backend.local || CONFIG.backend.remote) {
    tweetBackend.initialize()
    return tweetBackend
  }
  throw new Error('Missing config')
}
