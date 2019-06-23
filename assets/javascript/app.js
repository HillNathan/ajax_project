$(document).ready(function() {


    // this is our initial topics array, consisting of cartoon shows
var topicsArray = [ "Simpsons",
                    "Cats",
                    "Spongebob",
                    "Futurama",
                    "Pokemon",
                    "Dogs",
                    "Kids",
                    "Animals",
                    "Loony Toons",
                    "Office"];

var favoritesArray = JSON.parse(localStorage.getItem("gif-favorites"));
console.log("loading in array")
console.log(favoritesArray)
if (!Array.isArray(favoritesArray)) {
    favoritesArray = [];
}

var buttonsDiv = $(".buttons");                    
var addTopicButton;
var queryStartString = "https://cors-anywhere.herokuapp.com/https://api.giphy.com/v1/gifs/";
var giphyAPIString = "&api_key=RI2S49StxgjZpK645XRwSnO3qL47UQSd";
var giphyFilters = "&limit=10&rating=g"
var gifQueryString;
var gifsDiv = $(".gif-div");

makeButtons();
drawFavs();

addTopicButton = $("#add-topic");
newTopicInput = $("#topic");

function makeButtons() {
    // make sure the div is empty before adding all of teh buttons
    buttonsDiv.empty();

    // loop through the topicsArray and create a button for each item in the array
    for (var i=0; i < topicsArray.length; i++) {
        // declare a variable for a new button
        var newButton = $("<button>");

        //assign the appropriate attributes and info
        newButton.text(topicsArray[i]);
        newButton.attr("value", topicsArray[i]);
        newButton.addClass('btn btn-info m-2 gif-button');

        // append the new button to the appropriate div in the html page
        buttonsDiv.append(newButton);
    }
};

addTopicButton.click( function () {
    event.preventDefault();
    var newTopic = newTopicInput.val();
    if (newTopic !== ""){
        newTopicInput.val("");
        topicsArray.push(newTopic);
        makeButtons();
    };
});
    
$(document).on("click", ".gif-button" , function() {
    giphyCallAPI(this.value); 
});


function giphyCallAPI (name) {
    gifQueryString = name.replace(" ", "_");
    gifQueryString = gifQueryString.replace(/\W/g, "");
    gifQueryString = gifQueryString.replace("_", "+");
    var queryURL = queryStartString + "search?q=" + gifQueryString + giphyAPIString + giphyFilters;
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET",
        }).then(function(response) {
        console.log(response);
        drawGifs(response);
        });
}


function drawGifs (APIresponse) {
    // This is a function to take the API response and draw the GIFs into the appropriate location on the page

    // clear out anything from previous responses
    gifsDiv.empty();

    for (var i=0; i<APIresponse.data.length; i++) {
        var newIMG = $("<img>");
        newIMG.attr("src", APIresponse.data[i].images.fixed_width_still.url);
        newIMG.attr("data", APIresponse.data[i].images.fixed_width.url);
        newIMG.addClass("giphy-img");
        var newImgDiv = $("<div>");
        newImgDiv.addClass("card m-3");
        newImgDiv.append(newIMG);
        var newCardBody = $("<div>");
        newCardBody.addClass("card-body p-1");
        newCardBody.html("Rated: " + APIresponse.data[i].rating.toUpperCase())
        var newFavBtn = $("<button>");
        if (alreadyFav(APIresponse.data[i].title)){
            newFavBtn.addClass("btn btn-light p-1 favorite-yes");
        } else {
            newFavBtn.addClass("btn btn-light p-1 favorite-no");
        }
        newFavBtn.html("&hearts;");
        newFavBtn.attr("value", APIresponse.data[i].id);
        newFavBtn.attr("title", APIresponse.data[i].title);
        newCardBody.append(newFavBtn);
        newImgDiv.append(newCardBody);

        gifsDiv.append(newImgDiv);
        // console.log(APIresponse.data.length);
    }
};

$(document).on("click", ".giphy-img" , function() {
    var temp = $(this).attr("src");
    $(this).attr("src", $(this).attr("data"))
    $(this).attr("data", temp)
});


// Leaving this code in here, but I never could get the Favorites thing to work, mostly because I kept running into different 
//  API issues that I could not resolve. Between CORS and 401-Unauthorized responses that I could not figure our for the life
//  of me it was getting to be too much to get done by the end date of the class, so I scrapped the functionality, since it 
//  was a bonus goal anyway. 
// $(document).on("click", ".favorite-list" , function() {
//     var queryID = $(this).attr("data-id");
//     //http://api.giphy.com/v1/gifs?api_key=dc6zaTOxFJmzC&ids=feqkVgjJpYtjy
//     var queryURL = queryStartString + queryID + giphyAPIString;
//     // var queryURL = "http://api.giphy.com/v1/gifs?api_key=dc6zaTOxFJmzC&ids=feqkVgjJpYtjy"
//     console.log(queryID);
//     console.log(queryURL);
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//       }).then(function(response) {
//         // console.log(response);

//         drawGifs(response);
//       });
// });

$(document).on("click", ".favorite-no" , function() {
    if (!alreadyFav($(this).attr("title"))){
        $(this).attr("class", "btn btn-light p-1 favorite-yes");
        favoritesArray.push($(this).attr("title"));
        localStorage.setItem("gif-favorites", JSON.stringify(favoritesArray))
    }
    drawFavs();
});

function alreadyFav(name) {
    return favoritesArray.includes(name);
}

function drawFavs (){
    console.log(favoritesArray);
    $("#my-favorites").empty();
    
    for (var i=0; i<favoritesArray.length; i++){
        var newFav = $("<li>");
        newFav.html("<div class='favorite-list'>" + favoritesArray[i] + "</div>");
        $("#my-favorites").append(newFav);
    }
}


});


