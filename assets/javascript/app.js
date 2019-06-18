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

makeButtons();
addTopicButton = $("#add-topic");
newTopicInput = $("#topic");

var anyGifButton ;



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
    anyGifButton = $(".gif-button");
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
        console.log(this.value); 
    });


});


