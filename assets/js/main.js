$(document).ready(function () {

	$('.owl-carousel').owlCarousel({
		loop:true,
		autoplay: true,
        autoPlaySpeed: 1000,
        autoPlayTimeout: 1000,
        autoplayHoverPause: true,
		responsive:{
			0:{
				items:2
			},
			600:{
				items:3
			},
			1000:{
				items:5
			}
		}
	})
	
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

});


/*!
 * jquery.instagramFeed
 *
 * @version 1.2
 *
 *
 * https://github.com/jsanahuja/jquery.instagramFeed
 *
 */
(function($){
	var defaults = {
		'host': "https://www.instagram.com/",
		'username': 'skyworkz.nl',
		'container': '#instagram-feed-demo',
		'display_profile': true,
		'display_biography': true,
		'display_gallery': true,
		'get_raw_json': false,
		'callback': null,
		'styling': true,
		'items': 8,
		'items_per_row': 4,
		'margin': 0.5
	};
	$.instagramFeed = function(options){
		options = $.fn.extend({}, defaults, options);
		if(options.username == ""){
			console.error("Instagram Feed: Error, no username found.");
			return;
		}	
		if(!options.get_raw_json && options.container == ""){
			console.error("Instagram Feed: Error, no container found.");
			return;
		}
		if(options.get_raw_json && options.callback == null){
			console.error("Instagram Feed: Error, no callback defined to get the raw json");
			return;
		}

		$.get(options.host + options.username, function(data){
				data = data.split("window._sharedData = ");
				data = data[1].split("<\/script>");
				data = data[0];
				data = data.substr(0, data.length - 1);
				data = JSON.parse(data);
				data = data.entry_data.ProfilePage[0].graphql.user;

				console.log(data)
				
				if(options.get_raw_json){
					options.callback(JSON.stringify({
						id: data.id,
						username: data.username,
						full_name: data.full_name,
						is_private: data.is_private,
						is_verified: data.is_verified,
						biography: data.biography,
						followed_by: data.edge_followed_by.count,
						following: data.edge_follow.count,
						'images': data.edge_owner_to_timeline_media.edges,
					}));
					return;
				}
				
				var styles = {
					'profile_container': "",
					'profile_image': "",
					'profile_name': "",
					'profile_biography': "",
					'gallery_image': ""
				};
				if(options.styling){
					styles.profile_container = " style='text-align:center;'";
					styles.profile_image = " style='border-radius:10em;width:15%;max-width:125px;min-width:50px;'";
					styles.profile_name = " style='font-size:1.2em;'";
					styles.profile_biography = " style='font-size:1em;'";
					var width = (100 - options.margin * 2 * options.items_per_row)/options.items_per_row;
					// styles.gallery_image = " style='margin:"+options.margin+"% "+options.margin+"%;width:"+width+"%;float:left;'";
					
				}
				
				var html = "";
				if(options.display_profile){
					html += "<div class='instagram_profile'" +styles.profile_container +">";
					html += "	<img class='instagram_profile_image' src='"+ data.profile_pic_url +"' alt='"+ options.username +" profile pic'"+ styles.profile_image +" />";
					html += "	<p class='instagram_username'"+ styles.profile_name +">@"+ data.full_name +" (<a href='https://www.instagram.com/"+ options.username +"'>@"+options.username+"</a>)</p>";
				}
				
				if(options.display_biography){
					html += "	<p class='instagram_biography'"+ styles.profile_biography +">"+ data.biography +"</p>";
				}
				
				if(options.display_profile){
					html += "</div>";
				}
				
				if(options.display_gallery){
					if(data.is_private){
						html += "<p class='instagram_private'><strong>This profile is private</strong></p>";
					}else{
						var imgs = data.edge_owner_to_timeline_media.edges;
							max = (imgs.length > options.items) ? options.items : imgs.length;
						
						html += "<ul id='instagram-content-active'>";
						for(var i = 0; i < max; i++){
							var url = "https://www.instagram.com/p/"+ imgs[i].node.shortcode;
							html += "<li class='mix'><a href='"+url+"' target='_blank'>";
							html += "	<img class='img-responsive' src='"+ imgs[i].node.thumbnail_src +"' alt='"+ options.username +" instagram image "+ i+"' />";
							html += "<div class='overlay'><div><p>" + imgs[i].node.edge_media_to_caption.edges[0].node.text;
							html += "</p></div></div>";
							html += "</a></li>";
						}
						html += "</ul>";
					}
				}
				$(options.container).html(html);
			}
		);
	};
	
})(jQuery);
