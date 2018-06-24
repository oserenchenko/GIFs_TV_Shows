//array with intial tv shows
var tvShows = ['The Office', 'Game of Thrones', 'Parks and Recreation', 'Friends', 'Greys Anatomy', 'Suits', 'The Walking Dead', 'Modern Family', 'Vikings', 'Black Mirror', 'Stranger Things', 'Breaking Bad']

function makeButtons() {
  for (var i = 0; i < tvShows.length; i++) {
    var tvShow = tvShows[i];
    var newButton = $('<button>');
    newButton.html(tvShow);
    newButton.attr({
      class: 'showButton',
      showName: tvShow,
    });
    $('.buttons').append(newButton);
  }
}

function displayGifs() {
  var tvShow = $(this).attr("showName");
  var queryURL = "https:/api.giphy.com/v1/gifs/search?api_key=qL0YObgRkosgTuGJFuZX2DFFSetWSrE6&q=" + tvShow ;

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    console.log(response);
    var url = response.data[0].url
    $('.gifResults').append('<img src=' + url + '>');
  })
}

  makeButtons();

  $(document).on("click", ".showButton", displayGifs);