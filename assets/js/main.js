$(document).ready(function () {

  WebFontConfig = {
          google: { families: [
                  'Roboto:400,100,300,600',
                  'Open Sans:400,300,600',
                  'Volkhov:400italic',
          ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();
  // ]]>

  $(function () {
    $(document).scroll(function () {
      var $nav = $(".navbar");
      $nav.toggleClass('scrolled navbar-light', $(this).scrollTop() > $nav.height());

      var $navbarbrand = $(".navbar-brand");
      $navbarbrand.toggleClass('scrolled', $(this).scrollTop() > $nav.height());

      var $magicline = $("#magic-line");
      $magicline.toggleClass('scrolled', $(this).scrollTop() > $nav.height());
    });
  });

	$("#portfolio-content-active").mixItUp();

	$("#team-content-active").mixItUp();


	$("#testimonial-slider").owlCarousel({
		paginationSpeed: 500,
		singleItem: true,
		autoPlay: 3000,
	});

	$("#clients-logo").owlCarousel({
		autoPlay: 3000,
		items: 5,
		itemsDesktop: [1199, 5],
		itemsDesktopSmall: [979, 5],
	});

	$("#works-logo").owlCarousel({
		autoPlay: 3000,
		items: 5,
		itemsDesktop: [1199, 5],
		itemsDesktopSmall: [979, 5],
	});


	// google map
	var map;

	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
			center: {
				lat: 52.1048044,
				lng: 5.077286
			},
			zoom: 8
		});
	}


	// -----------------------------
	//  Count Up
	// -----------------------------
	function counter() {
		var oTop;
		if ($('.counter').length !== 0) {
			oTop = $('.counter').offset().top - window.innerHeight;
		}
		if ($(window).scrollTop() > oTop) {
			$('.counter').each(function () {
				var $this = $(this),
					countTo = $this.attr('data-count');
				$({
					countNum: $this.text()
				}).animate({
					countNum: countTo
				}, {
					duration: 1000,
					easing: 'swing',
					step: function () {
						$this.text(Math.floor(this.countNum));
					},
					complete: function () {
						$this.text(this.countNum);
					}
				});
			});
		}
	}
	// -----------------------------
	//  On Scroll
	// -----------------------------
	$(window).on('scroll', function () {
		counter();
	});


	// venobox
	$('.venobox').venobox();
});