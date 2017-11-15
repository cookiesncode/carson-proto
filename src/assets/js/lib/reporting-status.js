import $ from 'jquery';
var numberOfItems = 10; // These are the number of posts you want to retrieve
var category = 5
var feedUrl = 'http://www.fortcarsonmountaineer.com/wp-json/wp/v2/posts?categories=' + category + '&per_page=' + numberOfItems;
var output = []; 
var $pageTemplate = $('.feeds .template');

function outputHtml() {
  $('.comm').html(output)
}

function bindTemplate($newCell, feedItem) {
  $newCell.find('.item_img').attr('src',feedItem.imgSrc);
  $newCell.find('.item_url').attr('href', feedItem.url).text(feedItem.title);
  output.push($newCell.prop('outerHTML'));
}

$.getJSON(feedUrl, function (data, textStatus, jqxhr) {
  if (textStatus === 'success') {
    $.each(data, function(key, val) {
      var $newCell = $pageTemplate.clone().removeClass('template hide');
      var feedItem = {
        'title': val.title.rendered,
        'imgSrc' : $(val.content.rendered).find('img').eq(0).attr('src'),
        'url': val.link
      }
      bindTemplate($newCell, feedItem);
    });
    outputHtml();
  }
  else {
    $targetArea.html('<p>Uh oh, there is an issue getting the information right now.</p>');
  }  
});


