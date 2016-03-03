function Carousel(items) {
    for (var i = 0; i < items.length; i++) {
        console.log(items[i])
    }
}

$(document).ready(function() {
    console.log("Enter the Carousel")

    // console.log(redditapp.addCategory('r/todayilearned/'))

    $("#next-post").on("click", function() {
        $("#content").text("Reuters reporter taken into custody by Hamas officials in Gaza Reuters reporter taken into custody by Hamas officials in Gaza Reuters reporter taken into custody by Hamas officials in GazaReuters reporter taken into custody by Hamas officials in Gaza")
    })
    $("#prev-post").on("click", function() {
        $("#content").text("mas officials in Gaza Reuters reporter taken into custody by Hamas officials in Gaza Reuters reporter taken into custody by Hamas officials in Gaza Reuters reporter taken into custody by Hamas officials in Gaza")
    })
})
