$(document).ready(function() {
  $('#mySelect').on('change', function(event){
    event.preventDefault
    
    var selected = $(this).val();
    
    $('.article-list').empty();
    $('.log img').css({ width: '100px', height: '100px'});
    
    $('.loader').css({display:'block'});
    
    $.ajax({
      url: "https://api.nytimes.com/svc/topStory/v2/"+ selected +".json?api-key=U87MNuHfN5N3kF7xs8Sn3vnFvvVduzsf",
      method: 'GET',
      dataType: 'json'
     }).done(function(data) {
          let topStory = '';
          let i = 0;
          $.each(data.results, function(key, value){
            if (value.multimedia.length && i < 12){
              storyText = value.abstract;
              storyImage =value.multimedia[4].url;
              storyLink = value.url;

              topStory += '<li>'
                +'<a class="item-link" href="' + storyLink + '">'
                +'<div class="wrapper">'
                + '<div class="article" style="background-image:url('+storyImage+')">'
                +'<div class="articleText">'
                + '<p>' + storyText +'<p>'
                +'</div>'
                +'</div>'
                +'</div>'
                +'</a>'
                +'</li>';
              i++;
            }
          });
    $('.article-list').append(topStory);
    }).fail(function() {
      $('.article-list').append('<li> Error, try again pls.');
    }).always(function() {
      $('.loader').css('display','none');
    });
  });
});
