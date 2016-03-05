var carousel = {
    data: [],
    currIdx: 0,
    len: 0,
    setSocial: function(title, subreddit, url) {
        var fburl, twitterurl, redditurl
        fburl = encodeURI('https://facebook.com/sharer/sharer.php?u=' + url)
        twitterurl = encodeURI('https://twitter.com/intent/tweet?text=' + title + '&url=' + url)
        $('#facebook-link').attr('href', fburl)
        $('#twitter-link').attr('href', twitterurl)
        $('#reddit-link').attr('href', url)
    },
    setData: function(data) {
        document.getElementById('content').innerHTML = data
    },
    setSubreddit: function(subreddit) {
        document.getElementById('subreddit-name').innerHTML = subreddit
    },
    rotate: function(arr) {
        var len = arr.length, temp = [], iter, hinge
        hinge = redditapp.randomInt(0, len-1)
        for (iter = hinge; iter < len; iter++) {
            temp.push(arr[iter])
        }
        for (iter = 0; iter < hinge; iter++) {
            temp.push(arr[iter])
        }
        return temp
    },
    display: function(idx) {
        var title = this.getTitle(this.data[idx]), subreddit = this.getSubreddit(this.data[idx]), url = this.getURL(this.data[idx])
        this.setData(title)
        this.setSubreddit(subreddit)
        this.setSocial(title, subreddit, url)
    },
    go: function() {
        this.data = redditapp.fetch()
        this.data = this.rotate(this.data)
        this.currIdx = 0
        this.len = this.data.length
        this.display(0)
    },
    getNext: function() {
        this.currIdx++
        this.display(this.currIdx)
        return this.currIdx == this.data.length - 1
    },
    getPrevious: function() {
        this.currIdx--
        this.display(this.currIdx)
        return this.currIdx == 0
    },
    getTitle: function(obj) {
        return obj["data"]["title"]
    },
    getSubreddit: function(obj) {
        return obj["data"]["subreddit"]
    },
    getURL: function(obj) {
        return 'http://reddit.com/' + obj["data"]["permalink"]
    },
    refresh: function() {
        this.go()
    }
}

$(document).ready(function() {
    console.log("Enter the Carousel")
    $("#prev-post").hide()
    carousel.go()

    $("#next-post").on("click", function() {
        if (carousel.getNext()) {  // Hide next button
            $("#next-post").hide()
        }
        if (carousel.len > 1 && carousel.currIdx == 1) {
            $("#prev-post").show()
        }
    })
    $("#prev-post").on("click", function() {
        if (carousel.getPrevious()) {  // Hide next button
            $("#prev-post").hide()
        }
        if (carousel.currIdx == carousel.len - 2) {
            $("#next-post").show()
        }
    })
    $('#refresh-button').on('click', function() {
        carousel.refresh()
    })
})
