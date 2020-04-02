// Create array of strings for topics variable
$(document).ready(function () {


  var topics = ['milky way', 'galaxy', 'stars', 'nebula', 'black hole', 'astrology'];

  function genButtons() {

    $(".display-buttons").empty();


    for (i = 0; i < topics.length; i++) {
      var button = $('<button/>', {
        text: topics[i],
        class: "top-genButtons",
      });
      button.attr("data-value", topics[i])
      $(".display-buttons").append(button)
    }
  }
  $(document).on("click", ".btn-primary", function (event) {
    event.preventDefault();
    var input = $("#input").val();
    topics.push(input);
    $("#input").val("");
    genButtons();

  })
  genButtons();
  $(document).on("click", ".top-genButtons", function () {
  $(".giphy-section").empty()
    var title = $(this).attr("data-value");
    console.log("title: " + title)
    var apiKey = "Pi3IpyjBiZFkZmSASKn4J57JdmSj6rlf";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + title + "&api_key=" + apiKey + "&limit=12&rating<=pg"

    // Create AJAX call for the specific topic button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      // Stores giphy info
      var results = response.data;
      console.log(results); //checking results

      // for loop to create div to hold giphy info
      for (var i = 0; i < results.length; i++) {
        console.log(i)
        var giphyCard = $("<div>").addClass("col-3");
        var animatedURL = results[i].images.fixed_height.url;
        var stillURL = results[i].images.fixed_height_still.url;
        var giphyImage = $("<img>").addClass("giphyImg");
        var giphyRating = ("<p>Rating: " + results[i].rating.toUpperCase() + "</p>");
        
        giphyImage.attr("src", stillURL);
        
        giphyImage.attr("data-state", "still");
        giphyImage.attr("data-stillURL", stillURL);
        giphyImage.attr("data-animatedURL", animatedURL);
        console.log(results[i].images);
        giphyImage.attr('id', "images-" + i);
        giphyCard.append(giphyImage);
        giphyCard.append(giphyRating);
        $(".giphy-section").append(giphyCard);

        $("#images-" + i).on("click", function () {

          if ($(this).attr("data-state") === "still") {
            $(this).attr("src", $(this).attr("data-animatedURL"));
            $(this).attr("data-state", "animate");

          } else {
            $(this).attr("src", $(this).attr("data-stillURL"));
            $(this).attr("data-state", "still");

          }
        })
      }

    });
  });

})