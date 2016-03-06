/* global XMLHttpRequest, localStorage */

var redditapp = {
  DOWN_LIMIT: 50,
  fetch: function () { // return arr of JSON data
    var jsonData, key, url, xhr, result
    key = this.getkey()
    url = key['url'] + '/top/.json?limit=' + this.DOWN_LIMIT
    xhr = new XMLHttpRequest()
    xhr.open('GET', url, false)
    xhr.send()
    jsonData = JSON.parse(xhr.response)
    result = jsonData['data']['children']
    return result
  },
  getkey: function () {
    var idx, url, subreddit, temp
    idx = this.randomInt(0, localStorage.length - 1)
    url = localStorage.getItem(localStorage.key(idx))
    this.subredditurl = url
    this.subreddit = localStorage.key(idx)
    subreddit = localStorage.key(idx)
    console.log(subreddit)
    console.log(url)
    temp = '{"subreddit": "' + subreddit + '", "url": "' + url + '"}'
    return JSON.parse(temp)
  },
  randomInt: function (min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  },
  subredditurl: '',
  subreddit: ''
}

console.log('Loaded app.js | Max Down Size is: ' + redditapp.DOWN_LIMIT)
