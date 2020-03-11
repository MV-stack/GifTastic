// Create array of strings for topics variable

var topics = ['wolves', 'offroad', 'homesteading', 'alaska', 'fishing', 'fitness'];

 function genButtons(){
    for(i = 0; i <topics.length; i++) {
       var button =  $('<button/>', {
           text: topics[i], //set text 1 to 10
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
     var apikey ="Pi3IpyjBiZFkZmSASKn4J57JdmSj6rlf"
     var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +title +"&api_key=Pi3IpyjBiZFkZmSASKn4J57JdmSj6rlf&limit=10"

        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

          // YOUR CODE GOES HERE!!!
          console.log(response.data)
          var results = response.data;
          for (var i =0; i < results.length; i++) {
              console.log(i)
              var giphyCard = $("<div>")
          
              var animatedURL = results[i].images.fixed_height.url;
              var stillURL  = results[i].images.fixed_height_still.url;

              var giphyImage = $("<img>");
              giphyImage.attr("src",stillURL );
          
              giphyImage.attr("data-state", "still");
              giphyImage.addClass("gify-img");
                console.log(giphyImage)
              giphyCard.append(giphyImage)
              $(".giphy-section").append(giphyCard);
          }

        });
 })
