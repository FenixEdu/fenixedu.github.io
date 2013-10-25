$(document).ready(function() {

	$(".expands.workflow > a").before($('<img>').attr('src','./images/arrow_menu.png'));

	// Menu expand
	$(".expands.workflow").mouseover(function () {
		$(this).find('img').addClass('rotated').parent().siblings().find('img').removeClass('rotated');
		$(this).find('ul').slideDown(500).parent().siblings().find('ul').slideUp("slow");
	});

	// Img caption insertion
	$("main img").each(function () {
		$(this).before($('<hr />'));
		$(this).after($('<span>').text($(this).attr('alt')))
	});

	/*var menuIsAnimated = false;
	var activeElement = false;

	$(".expands.workflow").hover(function () {

		if (!menuIsAnimated) {
			$("ul", this).slideDown('slow', function () {
				menuIsAnimated = false;
				console.log('slideDown Over');

			});
			menuIsAnimated = true;
		} else {
		}
	    	

	}, function () {
		if (!menuIsAnimated) {
			$("ul", this).slideUp('slow', function () {
				menuIsAnimated = false;
				console.log('slideUp Over');
			});
			menuIsAnimated = true;
		}
	});*/

	/*
    var footerOffSet = 20;
    
    if(jQuery('section.related_content').length + jQuery('section.most_viewed_content').length + jQuery("figure.about_illustration").length > 0) {

        jQuery(window).scroll(function () { 

            var altura_obj = Number(jQuery('.aside_content').outerHeight(true)); // object height
            var altura_min = 316;                                                // min object height
            var altura_html = jQuery(document.body).height();                    // document height
            var altura_footer = Number(jQuery('footer').outerHeight(true));      // object height
            var position_article = jQuery('article').offset().top;               // article position
            var altura_article = Number(jQuery('article').outerHeight(true));    // article height
            var final_article = altura_article + position_article;               // final position
            var offset = jQuery(document).scrollTop();                           // scroll offset
            
            if ((altura_min < offset) && (altura_obj < altura_article)) {
                if (offset >= Number(final_article-altura_obj-footerOffSet)) {
                    jQuery('.aside_content').removeClass('scroll').removeClass('fixed').addClass('absolute');
                } else {
                    jQuery('.aside_content').removeClass('scroll').removeClass('absolute').addClass('fixed');
                }
            } else {
                jQuery('.aside_content').removeClass('fixed').removeClass('absolute').addClass('scroll');
            }
        });
    }
	*/

});