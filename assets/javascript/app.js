//array with intial tv shows
var tvShows = ['the office', 'game of thrones', 'parks and recreation', 'friends', 'greys anatomy', 'suits', 'the walking dead', 'modern family', 'vikings', 'black mirror', 'stranger things', 'breaking bad']

function makeButtons() {
  $('.buttons').empty();
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
  var tvShow = $(this).attr('showName');
  var queryURL = 'https:/api.giphy.com/v1/gifs/search?api_key=qL0YObgRkosgTuGJFuZX2DFFSetWSrE6&limit=10&q=' + tvShow;

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    console.log(response);
    $('.gifResults').empty();
    for (var i = 0; i < response.data.length; i++) {
      var newImg = $('<img>');
      newImg.attr({
        class: 'gifImage',
        'data-state': 'still',
        alt: 'gif image',
        src: response.data[i].images.fixed_height_still.url,
        'still': response.data[i].images.fixed_height_still.url,
        'gif': response.data[i].images.fixed_height.url.
        'rating': response.data[i].rating
      });
      $('.gifResults').append(newImg);
    }
    $('.gifImage').on('click', function () {
      var state = $(this).attr('data-state');
      if (state == 'still') {
        $(this).attr('src', $(this).attr('gif'));
        $(this).attr('data-state', 'gif');
      } else if (state == 'gif') {
        $(this).attr('src', $(this).attr('still'));
        $(this).attr('data-state', 'still');
      }
    });
  })
}

$("#submitBtn").on("click", function (event) {
  event.preventDefault();
  var newTvShow = $("#newTvShowToAdd").val().trim();
  if (tvShows.indexOf(newTvShow.toLowerCase()) < 0) {
    console.log(tvShows.indexOf(newTvShow));
    tvShows.push(newTvShow);
    makeButtons();
  }
});

makeButtons();

$(document).on('click', '.showButton', displayGifs);