// Create array of strings for topics variable

var topics = ['wolves', 'offroad', 'homesteading', 'alaska', 'fishing', 'fitness'];

 function genButtons(){

    $("#buttons-view").empty();
    
    for(i = 0; i <topics.length; i++) {
       var button =  $('<button/>', {
           text: topics[i], 
           class: "top-genButtons",
           
       });
       button.attr("data-value", topics[i])
       $(".display-buttons").append(button)
     }
 }
 genButtons();
 $(document).on("click", ".top-genButtons", function(){
     var title = $(this).attr("data-value");
     console.log("title: "+title)
     var apiKey = "Pi3IpyjBiZFkZmSASKn4J57JdmSj6rlf";
     var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +title +"&api_key="+apiKey+"&limit=10&rating<=pg"

        // Create AJAX call for the specific topic button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {          
          // Stores giphy from topic button
          var results = response.data;
          console.log(results);
          // Storing the rating data
          var rating = response.Rated;
          // Creating an element to have the rating displayed
          //var pOne = $("<p>").text("Rating: " + rating);
          // Displaying the rating
          //results.append(pOne);

          // for loop to create div to hold giphy
          for (var i =0; i < results.length; i++) {
              console.log(i)
              var giphyCard = $("<div>")                        
              var animatedURL = results[i].images.fixed_height.url;
              var stillURL  = results[i].images.fixed_height_still.url;
              var giphyImage = $("<img>");
              var giphyRating = ("<p>Rating: " + results[i].rating.toUpperCase() + "</p>");
              giphyImage.attr("src",stillURL );
              giphyCard.append(giphyRating)
              
          
              giphyImage.attr("data-state", "still");
              giphyImage.addClass("giphy-img");
                
              giphyCard.append(giphyImage)
              $(".giphy-section").append(giphyCard);
          }

        });
 })
