import $ from 'jquery';
var url = "http://www.fortcarsonmountaineer.com/wp-json/wp/v2/posts?categories=5&per_page=6"; 

$.getJSON(url, function (data, textStatus, jqxhr) {
  var $targetArea = $('.community-events');
  if (textStatus === "success") {
    var items = [];
    $.each(data, function(key, val) {
      items.push('<div class="cell"><div class="card"><div class="card-divider">' + val.title.rendered + '</div><div class="card-section">' + val.excerpt.rendered + '</div></div></div>');
    });
    $targetArea.html(items.join(''));
  }
  else {
    $targetArea.html('<p>Uh oh, there is an issue getting the information right now.</p>');
  }
});