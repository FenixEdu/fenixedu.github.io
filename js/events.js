$(document).ready(function() {

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

	$('input, textarea').placeholder();

	

	var menuTimeOutTimer = 0;
	var lastMenuOpened;

	// Create arrow bullet
	$(".expands.workflow > a").before($('<span>'));

	// Img caption insertion
	$("main img").each(function () {
		$(this).before($('<hr />'));
		$(this).after($('<span>').text($(this).attr('alt')))
	})

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
});