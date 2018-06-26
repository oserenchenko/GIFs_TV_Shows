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
  var tvShow = $(this).attr('showName');
  var queryURL = 'https:/api.giphy.com/v1/gifs/search?api_key=qL0YObgRkosgTuGJFuZX2DFFSetWSrE6&limit=10&q=' + tvShow ;

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    $('.gifResults').empty();
    for (var i = 0; i < response.data.length; i++) {
      var newImg = $('<img>');
      newImg.attr({
        class: 'gifImage',
        'data-state': 'still',
        alt: 'gif image',
        src: response.data[i].images.fixed_height_still.url,
        'still': response.data[i].images.fixed_height_still.url,
        'gif': response.data[i].images.fixed_height.url
      });
      $('.gifResults').append(newImg);
    }
    $('.gifImage').on('click', function() {
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






  makeButtons();

  $(document).on('click', '.showButton', displayGifs);