    $(window).scroll(function() {
      if ($(document).scrollTop() > 42) {
        $('nav').addClass('shrink');
      } else {
        $('nav').removeClass('shrink');
      }
    });