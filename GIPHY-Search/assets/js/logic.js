$(document).ready(function () {
    // list of default search terms
    var queryList = ["cow", "dog", "cat", "monkey", "giraffe", "orangutan", "hedgehog", "goose", "gorilla", "lion", "bear", "butterfly", "rhino", "snake", "unicorn", "kangaroo", "deer", "bunny", "hamster", "dolphin", "whale", "fox", "wolf", "squirrel", "mouse", "otter", "beaver", "starfish", "eel", "shark", "seahorse", "firefly", "octopus", "moose", "crocodile", "narwhal"]

    // dynamically generate list of dropdown options to return 1-50 search results
    for (i = 1; i < 51; i++) {
        $("#results-num").append("<option>" + i + "</option>")
    }

    // dynamically generate search term buttons
    for (i in queryList) {
        var newButton = $("<button>")
        newButton.addClass("btn btn-primary btn-sm search-term")
        newButton.text(queryList[i])
        $("#search-buttons").append(newButton)
    }

    // call GIPHY API using term in search button
    $(document).on("click", ".search-term", function () {
        getGifData($(this).text())
    })

    // play/pause returned gifs on click, toggles based on status attribute
    $(document).on("click", ".return-gif", function () {
        var status = $(this).attr("status")
        if (status === "still") {
            $(this).attr("src", $(this).attr("data-animated"))
            $(this).attr("status", "animated")
        } else {
            $(this).attr("src", $(this).attr("data-still"))
            $(this).attr("status", "still")
        }
    })

    // click listener for submit button
    $(document).on("click", ".submit", function () {
        event.preventDefault()
        var term = $("#search-box").val().trim()
        if (term) {
            var newButton = $("<button>")
            newButton.addClass("btn btn-primary btn-sm search-term")
            newButton.text(term)
            $("#search-buttons").prepend(newButton)
            getGifData(term)
        }
    })

    // calls GIPHY API, pulls given number of results, constructs static and animated images and displays them on the page 
    function getGifData(searchTerm) {
        // build URL to call API
        var url = "https://api.giphy.com/v1/gifs/search?api_key=m55c1fFgj7P5XVZs2lIUBU4nvnZ9o9af"
        var query = "&q=" + encodeURIComponent(searchTerm)
        var limit = "&limit=" + 10 // default number of results is 10
        if ($("#results-num").val() != "# Results") {
            limit = "&limit=" + $("#results-num").val()
        }
        url = url + query + limit
        
        // call API
        var result = $.ajax(url)
        result.done(function (response) {
            var searchData = response.data
            $("#gif-container").empty()
            for (i in searchData) {
                // construct an image holder div to hold gif image and rating caption div
                var newImgHolder = $("<div>")
                newImgHolder.addClass("imageHolder")

                // create image element, add attributes for still/animated image links and current animation status
                var newImg = $("<img>")
                newImg.addClass("return-gif img-raised rounded")
                newImg.attr("src", searchData[i].images.original_still.url)
                newImg.attr("data-animated", searchData[i].images.original.url)
                newImg.attr("data-still", searchData[i].images.original_still.url)
                newImg.attr("status", "still")

                // create hovering caption div, fill with rating retrieved from search data
                var newCaption = $("<div>")
                newCaption.addClass("caption rounded img-raised")
                newCaption.text("Rating: " + searchData[i].rating)

                // append image and caption to image holder
                newImgHolder.append(newImg)
                newImgHolder.append(newCaption)

                // append to document
                $("#gif-container").append(newImgHolder)
            }
        })
    }
})

