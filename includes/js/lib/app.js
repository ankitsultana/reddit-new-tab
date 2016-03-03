/*
 * app engine
 */
var redditapp = {
    fetch: function() {
        var arr
        arr = [1, 100, 230]
        return this.permute(arr)
    },
    geturl: function() {
        var i
        for (i = 0; i < localStorage.length; i++) {
            console.log(localStorage.getItem(localStorage.key(i)))
        }
    },
    addCategory: function(input) {
        var resp = this.checkCategory(input)
        if (resp == 1) {
            // error
            this.failure()
        } else {
            console.log(resp)
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
    permute: function(input) {

    },
    clear: function() {
        localStorage.clear()
    }
}
