'use strict';
var googletag = googletag || {};
var nydn={};
nydn.urls={};
nydn.urls.dfp="http://www.googletagservices.com/tag/js/gpt.js";
nydn.urls.jquery="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
nydn.urls.jqueryM="https://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min.js"
nydn.urls.sonobi="http://mtrx.go.sonobi.com/morpheus.nydailynews.js";

requirejs([nydn.urls.jquery], function(util) {
	$(function() {
		rg.start();
	});
});

var rg={};
rg.id =  window.location.href.split("-gallery-")[1] === undefined ?  "1.1275832" : window.location.href.split("-gallery-")[1];
//rg.jsonUrl = "http://www.nydailynews.com/json/cmlink/"+rg.id;
rg.jsonUrl= "./j/panda.json";
rg.json =  {};
rg.url="";
rg.length=-1;
rg.base="";
rg.overlay="";
rg.target={};
rg.delay=500;
rg.count=0;
rg.start = function(){
	rg.ads.init();
	rg.cover.init();
	rg.slide.init();
	rg.share.init();
	if($("body.cover").length)	 {
		rg.cover.show();
	}
	if($("body.slide").length)	 {
		rg.slide.adjust();
	}
	rg.click();
	rg.getJSON();
	rg.resize();


};





rg.click = function(e){
	$("#rg").on("click",function(e){
		rg.target =  e.target.id != "" ? e.target.id : e.target.classList[0];
		console.log(this);
		console.log("clicked: "+rg.target);
		console.log(e.target.classList);
		if (rg.target != "")
		switch (rg.target) {
			case  "rgc":
			case  "rg-headers":
			case  "rg-headline":
			case  "rg-description":
			case "rgc-to-s-1":
			case "rgc-to-s-2":
				rg.cover.hide(e);
				setTimeout(function(){
					rg.slide.show();
					 rg.slide.next(e);
				 },rg.delay);
				break;
			case "rgs-next":
				rg.slide.next(e);
				break;
			case "rgs-previous":
				rg.slide.previous(e);
				break;
			case "rgs-details":
			case "rgs-count":
			case "rgs-title":
			case "rgs-caption":
				rg.slide.details.toggle();
				break;
    		case "rgt-show":
				rg.cover.hide(e);
				rg.slide.hide();
				rg.endslate.hide(e);
				setTimeout(function(){
					rg.thumbs.show(e,rg.setMetaTags);
				 },rg.delay);
				break;
			case "rgt-to-cover":
				rg.thumbs.hide(e);
				setTimeout(function(){
					rg.cover.show();
				 },rg.delay);
				break;
			case "rgt-to-slide":
				rg.thumbs.hide(e);
				setTimeout(function(){
					rg.slide.show(rg.setMetaTags);
				 },rg.delay);
				break;
			case "rgt-to-s":
				rg.thumbs.hide(e);
				setTimeout(function(){
					rg.slide.show();
					rg.slide.pick($(e.target).attr("data-slide-no") );
				 },rg.delay);
				break;
			case "rge-previous":
				rg.endslate.hide(e);
				setTimeout(function(){
					rg.slide.show();
					rg.slide.previous(e);
				 },rg.delay);
				break;
			case "rge-to-cover":
				rg.endslate.hide(e);
				setTimeout(function(){
					rg.cover.show();
				 },rg.delay);
				break;
			case "rg-close":
				e.preventDefault();
				//rg.endslate.hide();
				//rg.cover.show();
				break;
			case "rg-share-t":
				rg.share.twitter();
				break;
			case "rg-share-f":
				rg.share.facebook();
				break;
			case "rg-share-e":
				rg.share.email();
				break;
			default:
				console.log("default click");
				return true;
		}
	});
	$("#rg").on("touchstart",function(e){
		rg.target =  e.target.id != "" ? e.target.id : e.target.classList[0];
		console.log("clicked: "+rg.target);
		if (rg.target != "")
		switch (rg.target) {
			case "rgs-next":
				rg.slide.next(e);
				break;
			case "rgs-previous":
				rg.slide.previous(e);
				break;
			default:
				console.log("default touchstart");
				return true;
		}
	});
};
rg.hideAll = function(){
	rg.cover.hide();
	rg.slide.hide();
	rg.thumbs.hide();
	rg.endslate.hide();
};
rg.close = function(templateName){
};
rg.cover={};
rg.cover.TITLE = null;
rg.cover.DESCRIPTION= null;
rg.cover.URL= null;
rg.cover.BITLY=null;

rg.cover.init = function(){
	rg.slide.no = -1;
	rg.base="cover";
	rg.overlay="cover";

	rg.cover.TITLE = $("#og_title").attr("content");;
	rg.cover.DESCRIPTION=$('#og_description').attr("content");;
	rg.cover.URL=$("#og_url").attr("content");
	rg.cover.BITLY=jQuery('[data-bitly]').attr('data-bitly');
	//rg.cover.show();
	//rg.ads.refresh(rg.overlay);
};
rg.cover.hide = function(e,callback){
	e.preventDefault();
	$("#rgc").fadeOut(function(){
		$("body").removeClass("cover");
	});
// 	if (typeof callback == 'function')
// 		setTimeout(function(){
// 			callback();
// 		},rg.delay);
};
rg.cover.show = function(){
	rg.base="cover";
	rg.overlay="cover";
	$("#rgc").fadeIn( function(){
		$("body").addClass("cover");
	});
	rg.share.show();
	rg.slide.no = -1;
	rg.slide.url="";
	rg.ads.refresh("cover");
};
rg.slide={};
rg.slide.no = -100;
rg.slide.title="";
rg.slide.caption="";
rg.slide.credit="";
rg.slide.img = {};
rg.slide.img.src="";
rg.slide.url="";
rg.slide.jslide={};
rg.slide.jdetails={};
rg.slide.init = function(){
	rg.base="slide";
	rg.overlay="";
	rg.ads.refresh(rg.overlay);
	rg.slide.jslide = $("#rgs");
	rg.slide.jdetails = $("#rgs-details");
};
rg.slide.adjust = function(){
	rg.slide.no = rg.slide.jdetails.find("#rgs-count span:first-child").text() - 1;
	rg.slide.show();
};
rg.slide.pick = function(slideNo){
	rg.slide.no = slideNo;
	rg.setMetaTagsAfter(rg.slide.details);
	// rg.share.twitter();
	// rg.share.email();
};
rg.slide.show = function(callback){
	rg.base="slide";
	rg.overlay="";
	$("#rgs").fadeIn(function(){
		$("body").addClass("slide");
		if(!(callback==null)){
			callback();
			// rg.share.twitter();
			// rg.share.email();
		}
	});
	rg.share.show();
	rg.ads.refresh("slide");
	rg.slide.details.noExpand();
};
rg.slide.next = function(e){
	e.preventDefault();
	rg.slide.no++;
	if (rg.slide.no ==  (rg.length)){
		rg.slide.hide();
		rg.endslate.show();
	}
	else if (!($.isEmptyObject(rg.json))) {
		rg.setMetaTagsAfter(rg.slide.details);
		// rg.share.twitter();
		// rg.share.email();
	}
	rg.slide.history();
};
rg.slide.previous = function(e){
	e.preventDefault();
	if (rg.slide.no ===  0){
		rg.slide.hide();
		rg.cover.show();
	}
	else if (!($.isEmptyObject(rg.json))) {
		rg.slide.no--;
		rg.setMetaTagsAfter(rg.slide.details);
		// rg.share.twitter();
		// rg.share.email();
	}
	rg.slide.history();
};

/*==made a function wrapper around rg.slide.details as i did not want
	to poke around too much or hard code stuff in it. this will fire a given function
	and then update the meta sata for share functionality. work in progress - rob */
rg.setMetaTagsAfter = function(fnA){
	fnA.apply(this);
	rg.setMetaTags();
}
/*====
	I've been playing with a simple way to populate share parameters for
	individual slides. still fleshing out ideas, but rg.setMetaTags is my 1st pass;
	Tried combining functionality into rg.slide.details but felt that gave too many responsibilities
	to that function and should be broken up into 2 simpler functions .
=====*/
rg.setMetaTags = function(){
	if($('#rg.thumbs').length>0){
		jQuery('#og_url').attr('content',rg.cover.URL);
		jQuery('meta[property="twitter:url"]').attr('content',rg.cover.URL);
		return;
	}
	//Want to find a consistent way to deal with share values. As of now all values here are setters. All
	//they do are set values.  Other code should only get those values.

	//facebook slide values - kept seperate while we still figure out sharing details
	jQuery('#og_title').attr('content',rg.slide.title);
	jQuery('#og_description').attr('content',rg.slide.caption);
	jQuery('#og_url').attr('content',rg.cover.URL+rg.slide.url);
	jQuery('#og_img').attr('content',rg.slide.img.src);

	//twitter slide values - kept seperate while we still figure out sharing details
	jQuery('meta[property="twitter:title"]').attr('content',rg.slide.title);
	jQuery('meta[property="twitter:url"]').attr('content',rg.cover.URL+rg.slide.url);
}
rg.slide.details = function(){
	var thisSlide = rg.json.images[rg.slide.no];

	if ($.isEmptyObject(rg.slide.jslide)) rg.slide.init();

	rg.slide.caption = thisSlide.caption;
	// rg.slide.title = thisSlide.imagetitle;
	rg.slide.url= "?pmSlide="+thisSlide.contentId;
	rg.slide.img.src = thisSlide.originalSrc;
	// rg.slide.url= "?pmSlide="+thisSlide.contentId;
	rg.slide.title = thisSlide.imagetitle;


	rg.slide.credit = thisSlide.credit;

	rg.slide.jslide.find("#rgs-img").attr("src",rg.slide.img.src);
	rg.slide.jdetails.find("#rgs-title").text(rg.slide.title);
	rg.slide.jdetails.find("#rgs-caption").text(rg.slide.caption);
	rg.slide.jdetails.find("#rgs-credit").text(rg.slide.credit);
	rg.slide.jdetails.find("#rgs-count span:first-child").text(Number(rg.slide.no)+1);
	rg.slide.counter();
	rg.slide.details.noExpand();
};
rg.slide.history = function(){
	history.pushState(null, rg.slide.title, rg.slide.url);
};
rg.slide.counter = function(){
	rg.count++;
	console.log("rg.count "+rg.count)
	if (rg.count === 3 ) {
		rg.count = 0;
		rg.ads.refresh("slide");
	}
};
rg.slide.details.toggle = function(){
	if ($("#rgs-details").hasClass("collapsed")) rg.slide.details.expand();
	else rg.slide.details.collapse();
};
rg.slide.details.expand = function(){
	rg.slide.jdetails.removeClass("collapsed");
	$("#rg-share").removeClass("collapsed");
};
rg.slide.details.collapse = function(){
	rg.slide.jdetails.addClass("collapsed");
	$("#rg-share").addClass("collapsed");
};

rg.slide.details.noExpand = function(){
	$("#rgs-details").removeClass("no-expand");
	rg.slide.jdetails.h = rg.slide.jdetails.height();
	console.log(rg.slide.jdetails.h);
	if (rg.slide.jdetails.h < 128) {
		$("#rgs-details").addClass("no-expand");

	}else{
		$("#rgs-details").removeClass("no-expand");
	};
};

rg.slide.hide = function(){
	$("#rgs").fadeOut(function(){
		$("body").removeClass("slide");
	});
};
rg.share={};
rg.share.init=function(){
	rg.share.pinterest();
	rg.share.facebookCount();
	window.fbAsyncInit = function() {
		FB.init({
		appId: 107464888913,
		xfbml: true,
		version: 'v2.1',
		status:true
		});
		rg.share.facebook
	}
	// rg.share.twitter();
	// rg.share.email();
}
rg.share.pinterest=function(){
		console.log('pinterest')
    $("#rg-share-p").click(function() {
        $("#pinmarklet").remove();
        var a = document.createElement("script");
        a.setAttribute("type", "text/javascript");
        a.setAttribute("charset", "UTF-8");
        a.setAttribute("id", "pinmarklet");
        a.setAttribute("src", "http://assets.pinterest.com/js/pinmarklet.js?r=" + Math.random() * 99999999);
        document.body.appendChild(a);
    });
};
rg.share.facebookCount = function(){
    var title = document.getElementById('og_url');
    jQuery.get('http://graph.facebook.com?ids=' + title.getAttribute('content'),
        function(response) {
            var count = response[title.getAttribute('content')].shares;
            var fbShare = jQuery("#fb-count");
            if (count == null) {
                return;
            }
            fbShare.text(count)
        })
}
rg.share.twitter=function(){
	var base="https://twitter.com/intent/tweet?url=";
	var anchor=jQuery('#rg-share-t a');
	var title =jQuery('meta[property="twitter:title"]').attr("content");
	var url = encodeURI(jQuery('meta[property="twitter:url"]').attr("content"));

	if($('#rg.thumbs').length>0 || $('#rg.cover').length>0 ){
		anchor.attr('href', base + rg.cover.BITLY+';text='+rg.cover.TITLE );
		return;
	}
	anchor.attr('href', base + url+';text='+title );
}
rg.share.email = function(){
	var title = jQuery('meta[property="og:title"]').attr("content");
	var url = jQuery('meta[property="og:url"]').attr("content");
	var desc = jQuery('meta[property="og:description"]').attr("content");

	if($('#rg.thumbs').length>0 || $('#rg.cover').length>0 ){
		jQuery("#rg-share-e a").attr("href", "mailto:?subject="+rg.cover.TITLE+"&body="+rg.cover.DESCRIPTION+"%0A%0A"+rg.cover.BITLY);
		return;
	}
	jQuery("#rg-share-e a").attr("href", "mailto:?subject="+title+"&body="+desc+"%0A%0A"+url);

}
rg.share.facebook=function(){
	var title = $('#og_url').attr('content');
	function getContent() {
		return FB.ui({
			method: 'share',
			href: title
		});
	}
	$('#rg-share-f').on('click',getContent);
}
rg.share.show = function(){
	$("#rg-share").fadeIn(function(){});
};
rg.share.hide = function(){
	$("#rg-share").fadeOut(function(){});
};

/*===THUMBNAILS==*/

rg.thumbs={};
rg.thumbs.hide = function(e){
	e.preventDefault();
	$("#rgt").fadeOut(function(){
		$("body").removeClass("thumbs");
	});
}
rg.thumbs.base="";
rg.thumbs.show = function(e,fn){
	rg.base="thumbs";
	rg.overlay="thumbs";
	rg.ads.refresh(rg.overlay);
	$("#rgt").fadeIn(function(){
		$("body").addClass(rg.overlay);
		if(!(fn==null)){
			fn.apply(this);
		}
		// rg.share.twitter();
		// rg.share.email();
	});
};
rg.endslate={};
rg.endslate.show=function(){
	rg.overlay="endslate";
	$("#rge").fadeIn(function(){
		$("body").addClass(rg.overlay);
	});
};
rg.endslate.hide=function(e){
	e.preventDefault();
	$("#rge").fadeOut(function(){
		$("body").removeClass("endslate");
	});
};
rg.getJSON = function(){
	$(function() {
		if ($.isEmptyObject(rg.json)) {
			$.getJSON(rg.jsonUrl )
			.done(function( data ) {
				rg.json = data;
				rg.length = $(rg.json.images).size();
				rg.url=rg.json.url;
				rg.slide.jdetails.find("#rgs-count span:nth-child(3)").text(rg.length);
				console.log( "NYDN - JSON SUCCESS" );
				// rg.share.twitter();
				// rg.share.email();
			})
			.fail(function( jqxhr, textStatus, error ) {
				var err = textStatus + ", " + error;
				console.log( "NYDN - JSON FAIL - " + err );
			});
		}
	});
};

rg.ads={};
rg.ATFwide={};
rg.ATFbox={};
rg.ads.init = function(){
	requirejs([nydn.urls.dfp], function(util) {
		googletag.cmd.push(function() {
			var mapping01 = googletag.sizeMapping().
				addSize([728, 100], [728, 90]).
				addSize([320, 100], [320, 50]).
				addSize([0, 0], [300, 50]).

				build();
			var mapping02 = googletag.sizeMapping().
				addSize([728, 100], [300, 250], [300, 600]).
				addSize([320, 100], [320, 50]).
				addSize([0, 0], [300, 50]).
				build();

			rg.ATFwide =  googletag
				.defineSlot("4692832/NYDN/Homepage",[[320,50],[728,90],[950,35],[970,90],[970,250],[970,200],[950, 200], [950, 35],[990,90],[1000,250]], "div-gpt-ad-x46")
				.addService(googletag.pubads())
				.defineSizeMapping(mapping01)
				.setTargeting("position", "x46");

			rg.ATFbox= googletag
				.defineSlot("4692832/NYDN/Homepage", [[300, 250], [300, 600]], "div-gpt-ad-x50")
				.addService(googletag.pubads())
				.defineSizeMapping(mapping02)
				 .setTargeting("position", "x50");

			googletag.pubads().enableSingleRequest();
			googletag.pubads().disableInitialLoad();
			googletag.enableServices();
			googletag.cmd.push(function(){sbi_morpheus.callOperator()});
			// googletag.pubads().refresh();
		});
	});
};
rg.ads.refresh = function(templateName){
	rg.ads.wait(function(){
		rg.ads.waitCallback(templateName);
	});
};
rg.ads.wait = function(callback){
	setTimeout(function(){
		if ((window.googletag && googletag.apiReady) &&  (typeof callback=="function") )
			callback();
		else rg.ads.wait();
	},300);
};
rg.ads.waitCallback = function(templateName){
	switch (templateName) {
		case "cover":
			console.log("refreshing rg.ATFwide");
			googletag.pubads().refresh([rg.ATFwide]);
			break;
		case "slide":
			if ($("#rg-ad-sticky-bottom").is(":visible")){
				console.log("refreshing rg.ATFwide");
				googletag.pubads().refresh([rg.ATFwide]);
			}else{
				console.log("refreshing rg.ATFbox");
				googletag.pubads().refresh([rg.ATFbox]);
			}
			break;
		case "thumbs":
			console.log("refreshing rg.ATFbox");
			googletag.pubads().refresh([rg.ATFbox]);
			break;
	}
};



// requirejs([nydn.urls.sonobi], function(util) {
// 	 sbi_morpheus.register('div-gpt-ad-x50', 'ebfb261c83ba67a16a8e');
// });

// requirejs(["http://c.amazon-adsystem.com/aax2/amzn_ads.js"], function(util) {
// 	try{amznads.getAds("3088")}catch(e){};
// });

// requirejs([nydn.urls.dfp], function(util) {
// 	getAudiences();
// });


rg.resize = function(){
	var resizeTimeout;
	$(window).resize(function(){
	  if(!!resizeTimeout){ clearTimeout(resizeTimeout); }
	  resizeTimeout = setTimeout(function(){
	    	console.log("Window Resized");
	    	rg.slide.details.noExpand();
	  },300);
	});
};



/*==FACEBOOK ==*/

(function(e, a, f) {
    var c, b = e.getElementsByTagName(a)[0];
    if (e.getElementById(f)) {
        return;
    }
    c = e.createElement(a);
    c.id = f;
    c.src = "//connect.facebook.net/en_US/sdk.js";
    b.parentNode.insertBefore(c, b);
}(document, "script", "facebook-jssdk"));

/*==FB UI EVENTS==*/



//INITIALIZATION
////WHEN DO WE WANT TO INITIALIZE TWITTER via require.js
! function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0]; if (!d.getElementById(id)) {js = d.createElement(s); js.id = id; js.src = "http://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs); } }(document, "script", "twitter-wjs");








