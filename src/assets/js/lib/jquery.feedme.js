import $ from 'jquery';
import jQuery from 'jquery';
(function($) {

  $.fn.feedMe = function(options) {
    
    $.fn.feedMe.defaults = {
      url : 'http://www.fortcarsonmountaineer.com/wp-json/wp/v2/posts',
      category : null,
      tags : null,
      quantity : 10
    };
    options = $.extend($.fn.feedMe.defaults, options);

    var $this = $(this);
    var categories = options.category ? '&categories=' + options.category : '';
    var tags = options.tags ? '&tags=' + options.tags : '';
    var url = 'http://www.fortcarsonmountaineer.com/wp-json/wp/v2/posts?per_page=' + options.quantity + categories + tags;
    var output = []; 
    var $template = $this.find('[data-feed-template]');
  
  
    function outputHtml() {
      $this.html(output);
    }
  
    function bindTemplate($newTemplate, feedItem) {
      $newTemplate.find('[data-feed-link]').attr('href',feedItem.url);
      $newTemplate.find('[data-feed-title]').text(feedItem.title);
      $newTemplate.find('[data-feed-content]').html(feedItem.content);
      $newTemplate.find('[data-feed-img]').attr('src',feedItem.imgSrc);
      $newTemplate.find('[data-feed-excerpt]').html(feedItem.excerpt);
      output.push($newTemplate.prop('outerHTML'));
    }
    
    return this.each(function() {

      $.getJSON(url, function (data, textStatus, jqxhr) {
        if (textStatus === 'success') {
          $.each(data, function(key, val) {
            var $newTemplate = $template.clone().removeClass('template hide');
            var feedItem = {
              'title' : val.title.rendered,
              'imgSrc' : $(val.content.rendered).find('img').eq(0).attr('src'),
              'url' : val.link,
              'excerpt' : val.excerpt.rendered,
              'content' : val.content.rendered,
              'tags' : val.tags,
              'categories' : val.categories
            }
            bindTemplate($newTemplate, feedItem);
          });
          outputHtml();
        }
        else {
          $targetArea.html('<p>Uh oh, there is an issue getting the information right now.</p>');
        }  
      });
    });

  }

})(jQuery);


