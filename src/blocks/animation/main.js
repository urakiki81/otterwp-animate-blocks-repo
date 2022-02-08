import $ from 'jquery';

// $(function($) {
  
//   // Function which adds the 'animated' class to any '.has-animation' in view
//   var doAnimations = function() {
    
//     // Calc current offset and get all .has-animation
//     var offset = $(window).scrollTop() + $(window).height(),
//         $animatables = $('.has-animation');
    
//     // Unbind scroll handler if we have no animatables
//     if ($animatables.length == 0) {
//       $(window).off('scroll', doAnimations);
//     }
    
//     // Check all animatables and animate them if necessary
// 		$animatables.each(function() {
//        var $animatable = $(this);
// 			if (($animatable.offset().top + $animatable.height() - 20) < offset) {
//         $animatable.addClass('reveal_visible');
// 			}
//     });

// 	};
  
//   // Hook doAnimations on scroll, and trigger a scroll
// 	$(window).on('scroll', doAnimations);
//   $(window).trigger('scroll');

// });

// $(document).on('mouseover', '.has__reset-animation', function() {
//   $(this).addClass("highlight").delay(10).queue(function(){
//     $(this).removeClass("highlight").dequeue();
//   });;

// });
$(document).ready(function() {

  //window and animation items
  var animation_elements = $.find('.has-animation');
  var web_window = $(window);

  //check to see if any animation containers are currently in view
  function check_if_in_view() {
    //get current window information
    var window_height = web_window.height();
    var window_top_position = web_window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    //iterate through elements to see if its in view
    $.each(animation_elements, function() {

      //get the element sinformation
      var element = $(this);
      var element_height = $(element).outerHeight();
      var element_top_position = $(element).offset().top;
      var element_bottom_position = (element_top_position + element_height) ;

      //check to see if this current container is visible (its viewable if it exists between the viewable space of the viewport)
      if ((element_bottom_position >= window_top_position ) && (element_top_position <= window_bottom_position)) {
        if($(element).hasClass("has-type-focus")){
          
          element.addClass('reveal_visible');
          $("body").addClass("with_promo_slide");
       
        }else{
          element.addClass('reveal_visible');
        }
        
        
      } else {
        
           
           if($(element).hasClass("has-type-focus"))
            {
              element.removeClass('reveal_visible');
              $("body").removeClass("with_promo_slide");
            }

        
      }
    });

  }

  //on or scroll, detect elements in view
  $(window).on('scroll resize', function() {
      check_if_in_view()
    })
    //trigger our scroll event on initial load
  $(window).trigger('scroll');

});