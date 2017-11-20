/*
      
      --------------------INSTRUCTIONS---------------------
      Javascript details:
        - Make a jQuery selection and call .feedMe() on it. Example: $(selector).feedMe(); 
        - You can pass options to the method using an object. 
          Example:
          $(selector).feedMe({
            category : 5,
            tags : 1110,
            quantity : 10,
            hideClass: 'hide'
          });

      -List of options:
        1. category = The category ID you wish to filter the post by. The plugin only accepts a single category. The default is 'none'
        2. tags = The tag ID you wish to filter by. The plugin only accepts a single tag. The default is 'none' 
        3. quantity = The number of posts you wish to receive. The default is 10 and the max is 100.
        4. hideClass = The class used to hide the [arent template element. Default is 'hide'

      - HTML details:
        - The HTML selection you pass to jQuery/$ must have a child element that will be used as your template. This element, usually a "div"  must have a data attribute called "data-feed-template". This element must also must have a class that sets it to display none. You can use the foundation 'hide' class to do this or you can use plain css to hide the template class.
        - The children of your template will use data attributes, i.e. data-feed-[datatype], in order to bind the return post data to it. 
          Full Example: 
          <div class="hide" data-feed-template>
            <h1 data-feed-title></h1>
            <div data-feed-content></div>
          </div>

        -List of data types available
          1. data-feed-link = Post link
          2. data-feed-title = Post title
          3. data-feed-content = Post content body
          4. data-feed-excerpt = Post excerpt
          5. data-feed-img = The first available image inside the content body
      
*/
import $ from 'jquery';
import jQuery from 'jquery';
(function($) {

  $.fn.feedMe = function(options) {
    
    options = $.extend($.fn.feedMe.defaults, options);
    var domSelection
    var categories = options.category !== 'none' ? '&categories=' + options.category : '';
    var tags = options.tags !== 'none' ? '&tags=' + options.tags : '';
    var url = 'http://www.fortcarsonmountaineer.com/wp-json/wp/v2/posts?per_page=' + options.quantity + categories + tags;
    var output = [];
    var $template
    var feedOutput = [];
    var count = 0;
    var $newTemplate
  
    function outputHtml() {
      $(domSelection).html(output);
    }
  
    function bindTemplate($newTemplate, data) {
      $.each(data, function(index, val) {
        $newTemplate.find('[data-feed-link]').attr('href', val.url);
        $newTemplate.find('[data-feed-title]').text(val.title);
        $newTemplate.find('[data-feed-content]').html(val.content);
        $newTemplate.find('[data-feed-img]').attr('src', val.imgSrc);
        $newTemplate.find('[data-feed-excerpt]').html(val.excerpt);
        output.push($newTemplate.prop('outerHTML'));
      });
      outputHtml();
    }

    return this.each(function() {

      if (count === 0) {
        $.getJSON(url, function (data, textStatus, jqxhr) {
          count++;
          if (textStatus === 'success') {
            $template = $(this).find('[data-feed-template]');
            $newTemplate = $template.clone().removeClass(options.hideClass).removeAttr('data-feed-template');
            $.each(data, function(key, val) {
              var feedItem = {
                'title' : val.title.rendered,
                'imgSrc' : $(val.content.rendered).find('img').eq(0).attr('src'),
                'url' : val.link,
                'excerpt' : val.excerpt.rendered,
                'content' : val.content.rendered,
                'tags' : val.tags,
                'categories' : val.categories
              }
              feedOutput.push(feedItem);
            });
            bindTemplate($newTemplate, feedOutput);
          }
          else {
            $this.html('<p>Uh oh, there is an issue getting the information right now.</p>');
          }  
        });
      } else {
        bindTemplate($newTemplate, feedOutput)
      }
    });

  }

  $.fn.feedMe.defaults = {
    category : 'none',
    tags : 'none',
    quantity : 10,
    hideClass : 'hide'
  }

})(jQuery);


