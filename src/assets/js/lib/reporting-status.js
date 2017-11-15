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
      var img = $(val.content.rendered).find('img').eq(0).attr('src');
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

// $.getJSON(feedUrl, function (data, textStatus, jqxhr) {
//   if (textStatus === 'success') {
//     $.each(data, function(key, val) {
//       imgUrl = val["_links"]['wp:featuredmedia']['0']['href'];
//       getImages(imgUrl);
//       titles.push(val.title.rendered)
//       links.push(val.link);
//     });
//   }
//   else {
//     $targetArea.html('<p>Uh oh, there is an issue getting the information right now.</p>');
//   }  
// });

// function getImages(imgUrl) {
//   $.getJSON(imgUrl, function (data, textStatus, jqxhr) {
//     thumbnails.push(data['media_details']['sizes']['medium']['source_url']);
//   });
// }

// function createDomElem() {
//   var items = []
//   $.each(titles, function(key, val) {
//     items.push('<div class="cell"><div class="card"><div class="card-section"><img src="' + thumbnails[key] + '"></div><div class="card-section"><p><a href="' + links[key] + '">' + val + '</a></p></div></div></div>');
//   });
//   $targetArea.html(items.join(''));
// }

// $(document).ajaxComplete(function(event, request, settings){
//   console.log('ajaxCompleteHandlerCalled');
//   if (settings.url === feedUrl) {
//     isTitlesLoaded = true
//   }
//   else if (settings.url === imgUrl) {
//     isImageLoaded = true;
//   }
//   if (isTitlesLoaded && isImageLoaded && thumbnails.length === numberOfItems) {
//     createDomElem();
//   }
// });
