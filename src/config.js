module.exports = {
  backend : {
    local : true,
    remote : false
  },
  Tweets : {
    local : {
      apiUrl : __dirname + '/../data'
    },
    remote : {
      apiUrl : 'https://some-rest-server.com/'
    }
  }
}
