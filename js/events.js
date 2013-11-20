$(document).ready(function() {


	// ScrollTo

	anchorClick = function (i) {
		return function () {
			$.scrollTo($("section.anchor_section:eq(" + i + ") > :first-child"), 'slow', {offset: {top:-10}});
		}
	}

	$(".anchor_link").each(function (n) {
		$(this).click(anchorClick(n));
	})

	$("#highlight .anchor").click(function () {
		$.scrollTo("time", {duration: 'slow', offset: {top:-125}});	
	})


	//Cross-browser Placeholder Rendering

	$('input, textarea').placeholder();


	// Documentation — Image caption insertion

	$("main img").each(function () {
		$(this).before($('<hr />'));
		$(this).after($('<span>').text($(this).attr('alt')))
	})
	
	// Documentation — Menu

	var menuTimeOutTimer = 0;
	var lastMenuOpened;

	// Create arrow bullet
	$(".expands.workflow > a").before($('<span>'));

	// Menu expand

	$("li.expands.workflow").each(function (index) {

		$(this).hover(function (event) {

			clearTimeout(menuTimeOutTimer);
			event.stopPropagation();
			$(this).find('span').addClass('rotated').parent().siblings().find('span').removeClass('rotated');

			if (lastMenuOpened == this) {
				$(this).find('ul').slideDown(500, simulateScroll).parent().siblings().find('ul').slideUp("slow", simulateScroll);
			} else {
				$(this).find('ul').clearQueue().stop().hide().slideDown(500, simulateScroll).parent().siblings().find('ul').clearQueue().stop().slideUp("slow", simulateScroll);
			}

			lastMenuOpened = this;
			return false;
		}, function (event) {
			menuTimeOutTimer = setTimeout(
				function () {
					$(lastMenuOpened).find('span').removeClass('rotated');
					$(lastMenuOpened).find('ul').slideUp("slow", simulateScroll);
					lastMenuOpened = null;
				}, 1000);
			event.stopPropagation();
			return false;
		})
	})

	// Menu scroll

    if($('aside').length > 0) {

        $(window).scroll(function () {
        	
    		var footerOffSet = 0;
            var height_obj = Number($('aside nav').outerHeight(true));   // object height
            
            var height_min = $('header').outerHeight(true);              // min object height
            //var height_html = $(document.body).height();               // document height
            //var height_footer = Number($('footer').outerHeight(true)); // object height
            
            var position_article = $('main').offset().top;               // article position
            var height_article = Number($('main').outerHeight(true));    // article height
            var final_article = height_article + position_article;       // final position
            var offset = $(document).scrollTop();                        // scroll offset

            if ((height_min < offset) && (height_obj < height_article)) {

            	if (height_obj >= Number(final_article - offset - footerOffSet)) {
                	$('aside nav').removeClass('scroll').removeClass('fixed').addClass('absolute');
            	} else {
                	$('aside nav').removeClass('scroll').removeClass('absolute').addClass('fixed');
            	}
            } else {
                $('aside nav').removeClass('fixed').removeClass('absolute').addClass('scroll');
            }
        }).scroll();
    }

    simulateScroll = function () {
    	$(window).scroll();
    }


    // Documentation — Mobile Menu

    var events = 'click.fndtn';

	// Watch for clicks to show the sidebar
	var $selector2 = $('#sidebarButton');
	
	if ($selector2.length > 0) {
    $('#sidebarButton').on(events, function (e) {
      e.preventDefault();
      $('body').toggleClass('active');
      $(window).resize();
    });
  	}

	  // // Adjust sidebars and sizes when resized
	  // $(window).resize(function() {
	  //   // if (!navigator.userAgent.match(/Android/i)) $('body').removeClass('active');
	  //   var $selector4 = $('#topMenu');
	  //   if ($selector4.length > 0) $selector4.css("margin-top", $selector4.height() * -1);
	  // });

	$(window).resize(
		function () {
			$('.active aside').css({height: $(document).height() + 'px'});
		}
	)

});