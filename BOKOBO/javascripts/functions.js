$(function(){

	$('a').click(function(e){
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
		        $('html,body').animate({
		          scrollTop: target.offset().top
		        }, 500);
	      	}
	      	e.preventDefault();
	    }
	});

	$('nav#main').affix({
      offset: {
        top: function() { return $(window).height()-80; }
      }
	});

	$('nav#main a').click(function(){
		$('nav#main a').removeClass('active');
		$(this).addClass('active');
	});

	var menuOpen = false;

	$('nav#main ul').click(function(e){
		if(menuOpen == false){
			$('nav#main ul').addClass('hover');
			menuOpen = true;
		}
		else {
			$('nav#main ul').removeClass('hover');
			menuOpen = false;
		}	

	});

	var offsetY = 50;

	$('section').waypoint(function(direction){
		var id = $(this).attr('id');
		$('nav#main a').removeClass('active');	
		if(direction == 'up')
			id = $(this).prev('section').attr('id');
			offsetY = 0;
		if(direction == 'down')
			offsetY = 50;
		if(id != undefined)
			$('nav#main a.'+id).addClass('active');
		else {
			$('nav#main a.home').addClass('active');
		}
	}, { offset: offsetY });

	var overlay = $('<div class="overlay dark"><div class="loader"></div><a href="#" class="icon prev"><div class="fa fa-caret-left"></div></a><a href="#" class="icon next"><div class="fa fa-caret-right"></div></a><img src="" class="centered" alt=""/><iframe class="centered" src="#" frameborder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen="true"></iframe><a href="#"><span class="fa fa-times"></span></a></div>');
	var overlayImage;
	var overlayIframe;
	var curItem;

	$('a.item').click(function(e){
		e.stopPropagation();
		e.preventDefault();
		curItem = $(this);
		$('body').append(overlay);
		overlay.fadeIn();
		lightboxInit(curItem);
	});

	function lightboxInit(el){

		overlayImage = overlay.find('img');
		overlayIframe = overlay.find('iframe');

		overlayImage.fadeOut(0);
		overlayIframe.fadeOut(0);

		overlayIframe.attr('src', '');
		overlayImage.attr('src', '');

		var url = el.attr('href');
		var videoUrl = el.attr('data-video');
		var videoType = el.attr('data-type');
		var videoW = el.attr('data-width');
		var videoH = el.attr('data-height');
		var prevItemExists = el.parent().prev().find('a').attr('class');
		var nextItemExists = el.parent().next().find('a').attr('class');

		if(!prevItemExists){
			$('.overlay .prev').fadeOut(250);
		} else {
			$('.overlay .prev').fadeIn(250);
		}

		if(!nextItemExists){
			$('.overlay .next').fadeOut(250);
		} else {
			$('.overlay .next').fadeIn(250);
		}

		if(videoType){
			overlayIframe.css({ 'width' : videoW, 'height': videoH });
		}
		if(videoType == 'vimeo'){
			overlayIframe.attr('src', 'http://player.vimeo.com/video/'+videoUrl+'').load(function(){
				overlayIframe.fadeIn(600);
			});
		}
		if(videoType == 'youtube'){
			overlayIframe.attr('src', 'http://www.youtube.com/embed/'+videoUrl+'').load(function(){
				overlayIframe.fadeIn(600);
			});
		}
		else if(!videoType){
			overlayImage.attr('src', url).load(function(){
				overlayImage.fadeIn(600);
			});
		}
	}

	$('body').on('click', '.next', function(){
		curItem = curItem.parent().next().find('a.item');
		$('.overlay .prev').fadeIn();
		if(curItem){
			overlayImage.fadeOut(600);
			overlayIframe.fadeOut(600);
			setTimeout(lightboxInit,600,curItem);
		}
	});

	$('body').on('click', '.prev', function(){
		curItem = curItem.parent().prev().find('a.item');
		$('.overlay .next').fadeIn();
		if(curItem){
			overlayImage.fadeOut(600);
			overlayIframe.fadeOut(600);
			setTimeout(lightboxInit,600,curItem);
		}
	});

	$('body').on('click', '.fa-times', function(){
		overlayIframe.attr('src', '');
		overlayImage.attr('src', '');
		overlay.fadeOut(300);
	});

});
