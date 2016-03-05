/*
 * app engine
 */
var redditapp = {
    DOWN_LIMIT: 3,
    fetch: function() { // return arr of JSON data
        var jsonData, key = this.getkey(), url, subreddit, xhr, result
        url = key["url"] + '/top/.json?limit=' + this.DOWN_LIMIT
        subreddit = key["subreddit"]
        xhr = new XMLHttpRequest()
        xhr.open('GET', url, false)
        xhr.send()
        jsonData = JSON.parse(xhr.response)
        result = jsonData["data"]["children"]
        return result
    },
    getkey: function() {
        var i, idx, url, subreddit, temp
        idx = this.randomInt(0, localStorage.length - 1)
        url = localStorage.getItem(localStorage.key(idx))
        subreddit = localStorage.key(idx)
        console.log(subreddit), console.log(url)
        temp = '{"subreddit": "' + subreddit + '", "url": "' + url + '"}'
        return JSON.parse(temp)
    },
    addCategory: function(input) {
        var resp = this.checkCategory(input)
        if (resp == 1) {
            // error
            this.failure()
        } else {
            localStorage.setItem(resp['subreddit'], resp['url'])
            console.log(resp)
        }
        this.printAllCategory()
    },
    printAllCategory: function() {
        var iter
        for (iter = 0; iter < localStorage.length; iter++) {
            console.log(localStorage.getItem(localStorage.key(iter)))
        }
    },
    deleteCategory: function(input) {

    },
    checkCategory: function(input) {
        var xhr = new XMLHttpRequest(), url = 'https://www.reddit.com/' + input, status, jsonData
        if (url.slice(-1) == '/') {
            url = url.slice(0, -1)
        }
        xhr.open('GET', url + '/top/.json?limit=1', false)
        xhr.send()
        status = xhr.status
        console.log(status)
        if (status != 200) {
            return 1
        } else {
            console.log(xhr.responseText)
            jsonData = JSON.parse(xhr.responseText)
            console.log(jsonData["data"]["children"][0]["data"]["subreddit"])
            return {
                "subreddit": jsonData["data"]["children"][0]["data"]["subreddit"],
                "url": url
            }
        }
    },
    failure: function() {
        console.log('Failed to add, please try again')
    },
    clear: function() {
        localStorage.clear()
    },
    randomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
}
