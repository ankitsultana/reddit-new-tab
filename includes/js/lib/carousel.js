var carousel = {
    data: [],
    currIdx: 0,
    len: 0,
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
    go: function() {
        this.data = redditapp.fetch()
        this.data = this.rotate(this.data)
        this.setData(this.getTitle(this.data[0]))
        this.setSubreddit(this.getSubreddit(this.data[0]))
        this.currIdx = 0
        this.len = this.data.length
    },
    getNext: function() {
        this.currIdx++
        var currIdx = this.currIdx
        this.setData(this.getTitle(this.data[currIdx]))
        this.setSubreddit(this.getSubreddit(this.data[currIdx]))
        return currIdx == this.data.length - 1
    },
    getPrevious: function() {
        this.currIdx--
        var currIdx = this.currIdx
        this.setData(this.getTitle(this.data[currIdx]))
        this.setSubreddit(this.getSubreddit(this.data[currIdx]))
        return currIdx == 0
    },
    getTitle: function(obj) {
        return obj["data"]["title"]
    },
    getSubreddit: function(obj) {
        return obj["data"]["subreddit"]
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
})
