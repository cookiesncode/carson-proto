import $ from 'jquery';
import whatInput from 'what-input';

window.$ = $;

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';
import './lib/jquery.feedme';

$(document).foundation();

$('.news-events').feedMe({
  category : 3,
  quantity : 12,
  imgSize : 'medium'
});

$('.reporting-status').feedMe({
  quantity : 1,
  category: 7923,
  imgSize : 'none'
});

$('.recent-news').feedMe({
  category : 7924,
  imgSize : 'none',
  quantity : 3
});
