$(document).ready(function() {


    // this is our initial topics array, consisting of cartoon shows
var topicsArray = [ "Simpsons",
                    "South Park",
                    "Spongebob",
                    "Futurama",
                    "Pokemon",
                    "King of the Hill",
                    "Bob's Burgers",
                    "Anamaiacs",
                    "Loony Toons",
                    "Tom & Jerry"];

var buttonsDiv = $(".buttons");                    
var addTopicButton;
var queryStartString = "https://api.giphy.com/v1/gifs/search?q="
var giphyAPIString = "&api_key=RI2S49StxgjZpK645XRwSnO3qL47UQSd?";
var gifQueryString = "cats"

makeButtons();
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
        console.log(queryURL);
        // // $.ajax({
        // //     url: queryURL,
        // //     method: "GET"
        // //   }).then(function(response) {
        //     console.log(response);
        //   });
    }







});


