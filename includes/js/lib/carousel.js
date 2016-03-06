/* global XMLHttpRequest, localStorage, $ */
var carousel = {
  data: [],
  DOWN_LIMIT: 50,
  fetch: function () { // return arr of JSON data
    var jsonData, key, url, xhr, result
    key = this.getkey()
    url = key['url'] + '/top/.json?limit=' + this.DOWN_LIMIT
    xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onload = function (e) {
      jsonData = JSON.parse(xhr.response)
      result = jsonData['data']['children']
      carousel.data = carousel.rotate(result)
      carousel.currIdx = 0
      carousel.len = carousel.data.length
      carousel.display(0)
      if (this.len < 2) {
        $('#next-post').hide()
      }
    }
    xhr.onerror = function (e) {
      carousel.displayError()
    }
    xhr.send()
  },
  go: function () {
    if (localStorage.length === 0) {
      this.displayNoneSelected()
      return
    }
    this.fetch()
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
  subreddit: '',
  currIdx: 0,
  len: 0,
  setSocial: function (title, subreddit, url) {
    var fburl, twitterurl
    fburl = encodeURI('https://facebook.com/sharer/sharer.php?u=' + url)
    twitterurl = encodeURI('https://twitter.com/intent/tweet?text=' + title + '&url=' + url)
    $('#facebook-link').attr('href', fburl)
    $('#twitter-link').attr('href', twitterurl)
    $('#reddit-link').attr('href', url)
  },
  setData: function (data) {
    document.getElementById('content').innerHTML = data
  },
  setSubreddit: function (subreddit, url) {
    document.getElementById('subreddit-name').innerHTML = subreddit
    $('#subreddit-name').attr('href', url)
  },
  rotate: function (arr) {
    var len, temp, iter, hinge
    temp = []
    len = arr.length
    hinge = this.randomInt(0, len - 1)
    for (iter = hinge; iter < len; iter++) {
      temp.push(arr[iter])
    }
    for (iter = 0; iter < hinge; iter++) {
      temp.push(arr[iter])
    }
    return temp
  },
  displayError: function () {
    this.setData('Oops! that request didn\'t go long')
    this.setSubreddit('Error')
  },
  displayNoneSelected: function () {
    this.setData('You haven\'t selected any subreddits. Click on the wrench on the bottom right of this page')
    this.setSubreddit('None')
  },
  display: function (idx) {
    var title, subreddit, url
    title = this.getTitle(this.data[idx])
    subreddit = this.getSubreddit(this.data[idx])
    url = this.getURL(this.data[idx])
    console.log(this.data[idx])
    this.setData(title)
    this.setSubreddit(subreddit, this.subredditurl)
    this.setSocial(title, subreddit, url)
  },
  getNext: function () {
    this.currIdx++
    this.display(this.currIdx)
    return this.currIdx === this.data.length - 1
  },
  getPrevious: function () {
    this.currIdx--
    this.display(this.currIdx)
    return this.currIdx === 0
  },
  getTitle: function (obj) {
    return obj['data']['title']
  },
  getSubreddit: function (obj) {
    return obj['data']['subreddit']
  },
  getURL: function (obj) {
    return 'http://reddit.com/' + obj['data']['permalink']
  },
  refresh: function () {
    this.go()
  }
}

$(document).ready(function () {
  console.log('Enter the Carousel')
  $('#prev-post').hide()
  carousel.go()

  $('#next-post').on('click', function () {
    if (carousel.getNext()) {  // Hide next button
      $('#next-post').hide()
    }
    if (carousel.len > 1 && carousel.currIdx === 1) {
      $('#prev-post').show()
    }
  })
  $('#prev-post').on('click', function () {
    if (carousel.getPrevious()) {  // Hide next button
      $('#prev-post').hide()
    }
    if (carousel.currIdx === carousel.len - 2) {
      $('#next-post').show()
    }
  })
  $('#refresh-button').on('click', function () {
    carousel.refresh()
  })
})
