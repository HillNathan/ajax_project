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

var favoritesArray = [];                    

var buttonsDiv = $(".buttons");                    
var addTopicButton;
var queryStartString = "https://api.giphy.com/v1/gifs/search?q=";
var giphyAPIString = "&api_key=RI2S49StxgjZpK645XRwSnO3qL47UQSd&limit=10&rating=g";
var gifQueryString;
var gifsDiv = $(".gif-div");

makeButtons();
drawFavs ();

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
        var queryURL = queryStartString + gifQueryString + giphyAPIString
        // console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            console.log(response);
            drawGifs(response);
          });
    }
function drawFavs (){
    $("#my-favorites").empty();
    
    for (var i=0; i<favoritesArray.length; i++){
        var newFav = $("<li>");
        newFav.text(favoritesArray[i].title)
        $("#my-favorites").append(newFav);
    }
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
        newFavBtn.addClass("btn btn-light favorite-no");
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

$(document).on("click", ".favorite-no" , function() {
    if (!alreadyFav($(this).attr("title"))){
        var newObj = {} ;
        newObj.title = $(this).attr("title");
        newObj.id = $(this).attr("value");
        favoritesArray.push(newObj);
    }
    drawFavs();
});

function alreadyFav(name) {
    for(var i=0; i<favoritesArray.length; i++){
        if(favoritesArray[i].title === name) {
            return true;  
        }
    }
    return false;
}



});


