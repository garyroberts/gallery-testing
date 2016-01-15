'use strict';
// var googletag = googletag || {};
var nydn = nydn || {};
nydn.urls={};
nydn.urls.jquery="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
nydn.urls.outbrain="http://widgets.outbrain.com/outbrain.js";
nydn.urls.json="http://www.nydailynews.com/json/cmlink/";
nydn.urls.jsonQA="http://wwwqa.nydailynews.com/json/cmlink/";
nydn.urls.jsonLocal = "http://localhost:8080/json/cmlink/";

var cc_client_id=4867;
var cc_extr_callback="ccauds";
requirejs([nydn.urls.jquery], function(util) {
	console.log("nydn function: jquery downlod SUCCESS");
	$(function() {
		rg.initialize();
	});
});
var rg={};
rg.json =  {};
// rg.id =  window.location.href.split("-gallery-")[1] === undefined ?  "1.1275832" : window.location.href.split("-gallery-")[1];
//rg.id =  window.location.href.split("-gallery-")[1] === undefined ?  "1.1475589" : window.location.href.split("-gallery-")[1];
//rg.id = nydn.contentID;
//rg.jsonUrl = "http://www.nydailynews.com/json/cmlink/"+rg.id;

// if(typeof(nydn.contentID) !== 'undefined' && nydn.contentID !== null) rg.id = nydn.contentID;
// else rg.id = "1.1275832";
// if (rg.id == "1.1475589") rg.jsonUrl= "./j/cars.json";
// else rg.jsonUrl= "./j/panda.json";

if(typeof(nydn.contentID) !== 'undefined' && nydn.contentID !== null) rg.id = "1.1275832";
else rg.id = nydn.contentID;
if (window.location.href.indexOf("wwwqa") > -1) rg.jsonUrl = nydn.urls.jsonQA+rg.id;
else if (window.location.href.indexOf("mockups") > -1) rg.jsonUrl = "./j/panda.json";
else if (window.location.href.indexOf("localhost") > -1) rg.jsonUrl = nydn.urls.jsonLocal+rg.id;
else rg.jsonUrl = nydn.urls.json+rg.id;



rg.url="";
rg.length=-1;
rg.base="";
rg.overlay="";
rg.target={};
rg.delay=500;
rg.count=0;
rg.platform="";
rg.bps={};
rg.bps.desktop="1024";
rg.bps.tablet="729";
rg.bps.mobile="320";
rg.resize = function(){
	var resizeTimeout;
	$(window).resize(function(){
	  if(!!resizeTimeout){ clearTimeout(resizeTimeout); }
	  resizeTimeout = setTimeout(function(){
	    	rg.slide.details.noExpand();
	    	rg.slide.jslide.w = rg.slide.jslide.width();
			console.log("nydn function: rg.resize "+rg.slide.jslide.w);
			rg.bps.initialize();
			rg.recirc();
	  },300);
	});
};
rg.bps.initialize = function(){
	if (window.innerWidth < rg.bps.tablet) rg.platform = "mobile";
	else if (window.innerWidth < rg.bps.desktop) rg.platform = "tablet";
	else rg.platform = "desktop";
	console.log("nydn function: rg.bps.initialize: "+rg.platform);
}
rg.initialize = function(){
	console.log("nydn function: rg.initialize");
	rg.bps.initialize();
	rg.ads.initialize();
	rg.cover.initialize();
	rg.slide.initialize();
	rg.share.initialize();
	rg.click();
	rg.getJSON();
	rg.resize();
	rg.browserButtons();
	rg.dtm.download();

};
rg.click = function(e){
	$("#rg").on("click",function(e){
		//rg.target =  e.target.id != "" ? e.target.id : e.target.classList[0];
		if( e.target.id != "" ){
			rg.target = e.target.id;
		}else{
			if (jQuery(e.target).attr("class") != ""  && jQuery(e.target).attr("class") != undefined){
				var cList = jQuery(e.target).attr("class").split(/\s+/);
				rg.target = cList[0];
			}
		}
		console.log("nydn function: rg.clicked: "+rg.target);
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
			case "rg-close":
				if( $("body.thumbs").length ){
					rg.thumbs.hide(e);
					setTimeout(function(){
						rg.slide.show(rg.setMetaTags);
					 },rg.delay);
				}
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
			case 'rg-share-e-e':
				rg.share.email();
				break;
			case 'rg-share-t-t':
				rg.share.twitter();
				break;
			case 'rg-share-f-f':
				rg.share.facebook();
				break;
			case 'rg-share-p-p':
				rg.share.pinterest();
				break;
			case "rg-close":
				e.preventDefault();
				break;
			case "rgi-to-slide":
				rg.interstitial.hide(e);
				setTimeout(function(){
					rg.slide.show();
				},rg.delay);
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
	$("#rg").on('keydown', function(e) {
		if ( (e.which == 39) || (e.which == 37) ) {
			if( $("body.cover").length ){
				rg.cover.hide(e);
				setTimeout(function(){
					rg.slide.show();
					rg.slide.next(e);
				},rg.delay);
			}else if( $("body.endslate").length ){
				switch (e.which) {
					case 39:
						rg.endslate.hide(e);
						setTimeout(function(){
							rg.cover.show();
						 },rg.delay);
						break;
					case 37:
						rg.endslate.hide(e);
						setTimeout(function(){
							rg.slide.show();
							rg.slide.previous(e);
						 },rg.delay);
						break;
					default:
						return true;
				}
			}else{
				switch (e.which) {
					case 39:
						console.log("FORWARD KEYBOARD ARROW CLICKED");
						rg.slide.next(e);
						break;
					case 37:
						console.log("PREV KEYBOARD ARROW CLICKED");
						rg.slide.previous(e);
						break;
					default:
						return true;
				}
			}
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
rg.cover.title = null;
rg.cover.description= null;
rg.cover.url= null;
rg.cover.bitly=null;
rg.cover.initialized= false;
rg.cover.initialize = function(){
	rg.slide.no = -1;
	rg.base="cover";
	rg.overlay="cover";
	rg.cover.title = $("#og_title").attr("content");;
	rg.cover.description=$('#og_description').attr("content");;

	//FOR LOCAL VERSION TESTING ON MOCKUPS - TO BE SIMPLIFIED TO:
	rg.cover.url=$("#og_url").attr("content");

	// if( window.location.href.indexOf("mockups") > -1 ){
	// 	rg.cover.url= window.location.href.split("?pmSlide")[0];
	// }else{
	// 	rg.cover.url=$("#og_url").attr("content");
	// }

	rg.cover.bitly= nydn.bitly;
	rg.cover.initialized= true;
	if($("body.cover").length)	 rg.cover.show();
};
rg.cover.hide = function(e,callback){
	e.preventDefault();
	$("#rgc").fadeOut(function(){
		$("body").removeClass("cover");
	});
};
rg.cover.show = function(){
	console.log("nydn function: rg.cover.show");
	rg.base="cover";
	rg.overlay="cover";
	$("#rgc").fadeIn( function(){
		$("body").addClass("cover");
	});
	rg.share.show();
	rg.slide.no = -1;
	rg.slide.url="";

	//if (!$("#div-gpt-ad-"+rg.ads.wide+" iframe").length) rg.ads.refresh("cover");
	rg.recirc();
};
rg.slide={};
rg.slide.initialized = false;
rg.slide.no = -100;
rg.slide.title="";
rg.slide.caption="";
rg.slide.credit="";
rg.slide.img = {};
rg.slide.img.src="";
rg.slide.url="";
rg.slide.jslide={};
rg.slide.jdetails={};
rg.slide.initialize = function(){
	console.log("nydn function: rg.slide.initialize");
	rg.slide.initialized= true;
	rg.base="slide";
	rg.overlay="";
	rg.slide.jslide = $("#rgs");
	rg.slide.jdetails = $("#rgs-details");
	if($("body.slide").length)	rg.slide.adjust();
};
rg.slide.adjust = function(){
	rg.slide.no = rg.slide.jdetails.find("#rgs-count span:first-child").text() - 1;
	rg.slide.show();
};
rg.slide.pick = function(slideNo){
	rg.slide.no = slideNo;
	rg.setMetaTagsAfter(rg.slide.details);
};
rg.slide.show = function(callback){
	rg.base="slide";
	rg.overlay="";
	$("#rgs").fadeIn(function(){
		$("body").addClass("slide");
		if(!(callback==null)){
			callback();
		}
	});
	rg.share.show();
	rg.slide.details.noExpand();
	rg.slide.jslide.w = rg.slide.jslide.width();
	console.log("nydn function: rg.slide.show "+rg.slide.jslide.w);
	rg.ads.refresh("slide");
	rg.slide.outbrain();
	rg.recirc();
};
rg.slide.next = function(e){
	e.preventDefault();
	rg.interstitial.check();
	rg.slide.sliding("next");
	if (rg.slide.no ==  (rg.length)){
		rg.slide.hide();
		rg.endslate.show();
	}
	else if (!($.isEmptyObject(rg.json))) {
		rg.setMetaTagsAfter(rg.slide.details);
	}
	rg.slide.history();
};
rg.slide.previous = function(e){
	e.preventDefault();
	rg.interstitial.check();
	rg.slide.sliding("prev");
	if (rg.slide.no ===  -1){
		rg.slide.hide();
		rg.cover.show();
	}
	else if (!($.isEmptyObject(rg.json))) {
		rg.setMetaTagsAfter(rg.slide.details);
	}
	rg.slide.history();
};
rg.slide.sliding = function(direction){
	var x = rg.slide.jslide.w;
	if (direction == "next"){
		x = -x;
	}
	var y = -x;
	var rgClone = $("#rgs-img").clone();
	rgClone.addClass("rg-clone").attr("id", "").insertBefore($("#rgs-img")).animate({
		    "margin-left": x+"px"
		}, 400, function() {
	    	$(this).remove();
  	});
	$("#rgs-img").stop().hide().css("margin-left", y+"px");
	direction == "next" ? rg.slide.no++ : rg.slide.no--;
	$("#rgs-img").show().animate({"margin-left": 0 }, 400);
}
rg.setMetaTagsAfter = function(fnA){
	fnA.apply(this);
	rg.setMetaTags();
}
rg.setMetaTags = function(){
	if($('#rg.thumbs').length>0){
		jQuery('#og_url').attr('content',rg.cover.url);
		jQuery('meta[property="twitter:url"]').attr('content',rg.cover.url);
		return;
	}
	$('#og_title').attr('content',rg.slide.title);
	$('#og_description').attr('content',rg.slide.caption);
	$('#og_url').attr('content',rg.cover.url+rg.slide.url);
	$('#og_img').attr('content',rg.slide.img.src);
	$('meta[property="twitter:title"]').attr('content',rg.slide.title);
	$('meta[property="twitter:url"]').attr('content',rg.cover.url+rg.slide.url);
}
rg.slide.details = function(){
	if (rg.slide.no > -1) {
		var thisSlide = rg.json.images[rg.slide.no];
		if ($.isEmptyObject(rg.slide.jslide)) rg.slide.initialize();
		rg.slide.caption = thisSlide.caption;
		rg.slide.url= "?pmSlide="+thisSlide.contentId;
		rg.slide.img.src = thisSlide.originalSrc;
		rg.slide.title = thisSlide.imagetitle;
		rg.slide.credit = thisSlide.credit;
		rg.slide.jslide.find("#rgs-img").attr("src",rg.slide.img.src);
		rg.slide.jdetails.find("#rgs-title").text(rg.slide.title);
		rg.slide.jdetails.find("#rgs-caption").text(rg.slide.caption);
		rg.slide.jdetails.find("#rgs-credit").text(rg.slide.credit);
		rg.slide.jdetails.find("#rgs-count span:first-child").text(Number(rg.slide.no)+1);
		rg.slide.counter();
		rg.slide.details.noExpand();
	}
};

rg.slide.history = function(){
	history.pushState(rg.slide.url, rg.slide.title, rg.slide.url);
	rg.browserPrevNext();
};

//BROWSER BACK AND FORWARD BUTTONS - DIFFERENTIATE BETWEEN BACK AND FORWARD BUTTON
rg.browserButtons = function(){
    $(window).on('popstate', function(e) {
		if (history.state == "?pmSlide="+rg.slide.prevId){
			console.log("PREVIOUS BUTTON CLICKED");
			rg.browserBack();
		}else if (history.state == "?pmSlide="+rg.slide.nextId){
			console.log("NEXT BUTTON CLICKED");
			rg.browserNext();
		};
    });
}

//GET IDs FOR PREV AND NEXT SLIDE TO COMPARE AGAINST HISTORY
rg.browserPrevNext = function(){
	if(rg.json.images[rg.slide.no-1] == undefined){
		rg.slide.prevId = rg.json.images[0].contentId;
	}else{
		rg.slide.prevId = rg.json.images[rg.slide.no-1].contentId;
	}
	rg.slide.nextId = rg.json.images[rg.slide.no+1].contentId;
}

//BROWSER BACK
rg.browserBack = function(){
	rg.slide.sliding("prev");
	console.log(rg.slide.no);
	if (rg.slide.no <= 0){
		rg.slide.hide();
		rg.cover.show();
		rg.slide.history();
	}
	else if (!($.isEmptyObject(rg.json))) {
		rg.setMetaTagsAfter(rg.slide.details);
	}
	rg.browserPrevNext();
}

//BROWSER FORWARD
rg.browserNext = function(){
	rg.slide.sliding("next");
	if (rg.slide.no ==  (rg.length)){
		rg.slide.hide();
		rg.endslate.show();
	}
	else if (!($.isEmptyObject(rg.json))) {
		rg.setMetaTagsAfter(rg.slide.details);
	}
	rg.browserPrevNext();
}

rg.slide.counter = function(){
	rg.count++;
	console.log("rg.count "+rg.count)
	if (rg.count === rg.ads.refreshCounter ) {
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
rg.outbrain={};
rg.slide.outbrained = false;
rg.slide.outbrain = function(){
	console.log("nydn function: rg.slide.outbrain");
	rg.outbrain = $("#rga-outbrain");
	if (!rg.slide.outbrained)
		requirejs([nydn.urls.outbrain], function(util) {
			console.log("NYDN ADS: OURTBRAIN DOWNLOADED");
			rg.outbrain.append("<div class='OUTBRAIN' data-widget-id='SB_1' data-ob-template='nydn'></div>");
			OBR.extern.researchWidget(1);
			rg.slide.outbrained = true;
		});
};
rg.recirc = function(){
	if(rg.platform == "desktop"){
		$("#rg-close").on( "mouseover", function(){
			if( !$("#rgr").is(":visible") ){
				$("#rgr").show().stop().animate({
				    "top": "0"
					}, 400, function() {
		  		});
				$("#rg-header").addClass("recirc");
				if( !$("body.cover").length ){
					$("#rg-share dl").fadeOut("fast");
				}
				$("#rgt-to-slide").fadeOut("fast");
				if( !$("body.thumbs").length ){
					$("#rgt-show").fadeOut("fast");
				}
				$("#rg-close").on( "click", function(e){
					e.preventDefault();
					rg.recirc.slideup();
				});
			}
			$("#rgr").on( "mouseleave", function(e){
				if( $("#rgr").is(":visible") && !$(e.relatedTarget).is( $("#rg-share")) && !$(e.relatedTarget).is( $("#rg-share *")) && !$(e.relatedTarget).is( $("#rg-header") ) && !$(e.relatedTarget).is( $("#rg-close") ) ){
					//console.log( e.relatedTarget.nodeName +" - "+e.relatedTarget.id );
					rg.recirc.slideup();
					$("#rg-header").on( "mouseleave", function(e){
						if( $("#rgr").is(":visible") && !$(e.relatedTarget).is( $("#rgr")) && !$(e.relatedTarget).is( $("#rgr *")) && !$(e.relatedTarget).is( $("#rg-close") ) ){
							rg.recirc.slideup();
						}
					});
				}
			});
		});
	}else{
		//TURN OFF EVENT LISTENER
		$("#rg-close").off( "mouseover");
		return;
	}
}
rg.recirc.slideup = function(){
	$("#rgr").stop().animate({
	    "top": "-250px"
	}, 400, function(){
		$(this).hide();
		$("#rg-header").removeClass("recirc");
		$("#rg-share dl").fadeIn();
		if( $("body.thumbs").length ){
			$("#rgt-to-slide").fadeIn();
		}else{
			$("#rgt-show").fadeIn();
		}
	});
}
rg.share={};
rg.share.initialize=function(){
	rg.share.facebookCount();
}
rg.share.pinterest=function(){
        $("#pinmarklet").remove();
        var a = document.createElement("script");
        a.setAttribute("type", "text/javascript");
        a.setAttribute("charset", "UTF-8");
        a.setAttribute("id", "pinmarklet");
        a.setAttribute("src", "http://assets.pinterest.com/js/pinmarklet.js?r=" + Math.random() * 99999999);
        document.body.appendChild(a);
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
rg.share.facebook=function(){
	var title = $('#og_url').attr('content');
	FB.ui({
		method: 'share',
		href: title
	});
}
rg.share.twitter=function(){
	var base="https://twitter.com/intent/tweet?url=";
	var anchor=jQuery('#rg-share-t a');
	var title =jQuery('meta[property="twitter:title"]').attr("content");
	var url = encodeURI(jQuery('meta[property="twitter:url"]').attr("content"));

	if($('#rg.thumbs').length>0 || $('#rg.cover').length>0 ){
		anchor.attr('href', base + rg.cover.bitly+';text='+rg.cover.title );
		return;
	}
	anchor.attr('href', base + url+';text='+title );
}
rg.share.email = function(){
	var title = $('meta[property="og:title"]').attr("content");
	var url = $('meta[property="og:url"]').attr("content");
	var desc = $('meta[property="og:description"]').attr("content");

	if($('#rg.thumbs').length>0 || $('#rg.cover').length>0 ){
		jQuery("#rg-share-e a").attr("href", "mailto:?subject="+rg.cover.title+"&body="+rg.cover.description+"%0A%0A"+rg.cover.bitly);
		return;
	}
	$("#rg-share-e a").attr("href", "mailto:?subject="+title+"&body="+desc+"%0A%0A"+url);
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
	rg.slide.jdetails.fadeIn();
	if(rg.outbrain.length){rg.outbrain.fadeIn();}
	$("#rgt").fadeOut(function(){
		$("body").removeClass("thumbs");
	});
}
rg.thumbs.base="";
rg.thumbs.show = function(e,callback){
	rg.base="thumbs";
	rg.overlay="thumbs";
	rg.ads.refresh(rg.overlay);
	rg.thumbs.populate();
	rg.slide.jdetails.fadeOut();
	//rg.outbrain.fadeOut();
	if(rg.outbrain.length){rg.outbrain.fadeOut();}
	$("#rgt").fadeIn(function(){
		$("body").addClass(rg.overlay);
		if(!(callback==null)){
			callback.apply(this);
		}
	});
	$("#rgt-show").attr("style", "");
};
rg.thumbs.populate = function(){
	var thumbsLength = $("#rgt li").length;
	if( thumbsLength == 2 ){
		$(rg.json.images).each(function(index){
			$('<li><a href="#"  itemprop="thumbnailUrl"><img class="rgt-to-s" data-slide-no="'+index+'" src="'+this.mobileSrc+'" /></a></li>').insertBefore("#rgt li:last-child");
		});
	}
};
rg.endslate={};
rg.endslate.show=function(){
	rg.overlay="endslate";
	$("#rge").fadeIn(function(){
		$("body").addClass(rg.overlay);
	});
	rg.endslate.outbrain();
};
rg.endslate.hide=function(e){
	e.preventDefault();
	$("#rge").fadeOut(function(){
		$("body").removeClass("endslate");
	});
};
rg.endslate.outbrained = false;
rg.endslate.outbrain = function(){
	console.log("nydn function: rg.endslate.outbrain");
	if (!rg.endslate.outbrained)
	requirejs([nydn.urls.outbrain], function(util) {
		console.log("NYDN ADS: OURTBRAIN DOWNLOADED");
		$("#rge-outbrain").append("<div class='OUTBRAIN' data-widget-id='SB_1' data-ob-template='nydn'></div>");
		OBR.extern.researchWidget(1);
		rg.endslate.outbrained = true;
	});
};
rg.getJSON = function(){
	console.log("nydn function: rg.getJSON");
	$(function() {
		if ($.isEmptyObject(rg.json)) {
			$.getJSON(rg.jsonUrl )
			.done(function( data ) {
				rg.json = data;
				rg.length = $(rg.json.images).size();
				rg.url=rg.json.url;
				rg.slide.jdetails.find("#rgs-count span:nth-child(3)").text(rg.length);
				console.log("nydn function: rg.getJSON SUCCESS");
			})
			.fail(function( jqxhr, textStatus, error ) {
				var err = textStatus + ", " + error;
				console.log("nydn function: rg.getJSON FAIL - "+err);
			});
		}
	});
};
rg.interstitial = {};
rg.interstitial.counter=-1;
rg.interstitial.check = function(){
	if ($("body.slide").length){
		rg.interstitial.counter++;
		if (rg.interstitial.counter == rg.ads.interstitialCounter) rg.interstitial.show();
	}
};
rg.interstitial.show = function(){
	rg.interstitial.counter = 0;
	rg.overlay="interstitial";
	rg.ads.refresh("interstitial");
	rg.slide.jdetails.fadeOut();
	rg.outbrain.fadeOut();
	$("#rgi").fadeIn(function(){
		$("body").addClass(rg.overlay);
	});
};
rg.interstitial.hide=function(e){
	e.preventDefault();
	rg.slide.jdetails.fadeIn();
	rg.outbrain.fadeIn();
	$("#rgi").fadeOut(function(){
		$("body").removeClass("interstitial");
	});
};
rg.ads={};
rg.ATFwide={};
rg.ATFbox={};
rg.ATFinterstitial={};
rg.ads.refreshCounter = 3;
rg.ads.interstitialCounter = 5;
rg.ads.wide = "x46";
rg.ads.box = "x50";
rg.ads.interstitial = "x106";
rg.ads.lists = {};
rg.ads.lists.setup = function(){
	console.log("nydn function: rg.ads.lists.setup");
	rg.ads.section =  $("body").attr("data-ads-section");
	if (nydn.bidder.contains("amazon")) {
		rg.ads.sonobi.waitingList.push(rg.ads.amazon.url);
		rg.ads.openx.waitingList.push(rg.ads.amazon.url);
		rg.ads.dfp.waitingList.push(rg.ads.amazon.url);
		rg.ads.lotame.waitingList.push(rg.ads.amazon.url);
	}
	if (nydn.bidder.contains("sonobi") && rg.platform !=="mobile") {
 		rg.ads.openx.waitingList.push(rg.ads.sonobi.url);
 		rg.ads.dfp.waitingList.push(rg.ads.sonobi.url);
		rg.ads.lotame.waitingList.push(rg.ads.sonobi.url);
 	}
 	if (nydn.bidder.contains("openx") && rg.platform !=="mobile") {
 		rg.ads.dfp.waitingList.push(rg.ads.openx.url);
  		rg.ads.lotame.waitingList.push(rg.ads.openx.url);
 	}
 	if (nydn.bidder.contains("dfp")) {
 		rg.ads.dfp.waitingList.push(rg.ads.dfp.url);
		rg.ads.lotame.waitingList.push(rg.ads.dfp.url);
	}
	if (nydn.bidder.contains("lotame") && rg.platform !=="mobile") {
 		rg.ads.lotame.getURL();
 	}
};
rg.ads.initialize = function(){
	if (nydn.bidder.contains("dfp")){
		console.log("nydn function: rg.ads.initialize");
		rg.ads.lists.setup();
		if (nydn.bidder.contains("jumpstart")) rg.ads.jumpstart.setup();
		if (nydn.bidder.contains("amazon")) rg.ads.amazon.download();
		if (nydn.bidder.contains("sonobi") && rg.platform !=="mobile")   rg.ads.sonobi.download();
		if (nydn.bidder.contains("openx") && rg.platform !=="mobile")   {
			rg.ads.openx.download();
			console.log("nydn function: NO googletag");
		}
		else{
			console.log("nydn function:  define googletag");
			var googletag = googletag || {};
			 googletag.cmd = googletag.cmd || [];
		}
		if (nydn.bidder.contains("dfp")){
			 rg.ads.dfp.download();
		}
	}
};
rg.ads.refreshed = false;
rg.ads.refresh = function(templateName){
	if (nydn.bidder.contains("dfp")){
		console.log("nydn function: rg.ads.refresh: "+templateName);
		requirejs(rg.ads.dfp.waitingList, function(util) {
			if (window.googletag && googletag.apiReady) {
				setTimeout(function(){
					rg.ads.refreshCheck(templateName);
				},100);
				return true;
			}
			else {
				console.log("nydn ads: NOT REFRESHED "+templateName);
				rg.ads.refreshCheck(templateName);
				return false;
			}
		});
	}
};
rg.ads.refreshCheck = function(templateName){
	console.log("nydn function: rg.ads.refreshCheck: "+rg.ads.refreshed);
	if (rg.ads.refreshed && nydn.bidder.contains("amazon")) {
		amznads.getAdsCallback('3088', function(){
			amznads.setTargetingForGPTAsync('amznslots');
			console.log("nydn function: rg.ads.refreshCheck: amazon setTarget");
			googletag.pubads().clearTargeting('amznslots');
			console.log("nydn function: rg.ads.refreshCheck: amazon clearTargeting");
			rg.ads.refreshTemplate(templateName);
		});
	}
	else {
		rg.ads.refreshed = true;
		rg.ads.refreshTemplate(templateName);
	}
};
rg.ads.refreshTemplate = function(templateName){
	console.log("nydn function: rg.ads.refreshTemplate: "+templateName);
	switch (templateName) {
		case "cover":
			console.log("nydn function: rg.ads.refreshingTemplate: "+templateName+" WIDE");
			googletag.pubads().refresh([rg.ATFwide]);
			break;
		case "slide":
			if ($("#rg-ad-sticky-bottom").is(":visible")){
				console.log("nydn function: rg.ads.refreshingTemplate: "+templateName+" WIDE");
				googletag.pubads().refresh([rg.ATFbox]);
				googletag.pubads().refresh([rg.ATFwide]);
			}else{
				console.log("nydn function: rg.ads.refreshingTemplate: "+templateName+" BOX");
				googletag.pubads().refresh([rg.ATFbox]);
			}
			// if ($("body.jumpstart").length) {
// 				console.log("nydn function: rg.ads.refreshingTemplate: "+templateName+" BOX");
// 				googletag.pubads().refresh([rg.ATFbox]);
// 			}
			break;
		case "thumbs":
			console.log("nydn function: rg.ads.refreshingTemplate: "+templateName+" BOX");
			googletag.pubads().refresh([rg.ATFbox]);
			break;
		case "interstitial":
			console.log("nydn function: rg.ads.refreshingTemplate: "+templateName+" INTERSTITIAL");
			googletag.pubads().refresh([rg.ATFinterstitial]);
			break;
	}
};
//AMAZON
rg.ads.amazon={};
rg.ads.amazon.url="http://c.amazon-adsystem.com/aax2/amzn_ads.js";
rg.ads.amazon.download = function(){
	console.log("nydn function: rg.ads.amazon.download SUCCESS");
};
rg.ads.amazon.exe = function(){
	requirejs(rg.ads.dfp.waitingList, function(util) {
		console.log("nydn function: rg.ads.amazon.exe");
		try {
			amznads.setTargetingForGPTAsync('amznslots');
			console.log("nydn function: rg.ads.amazon.exe SUCCESS");
		} catch(e) {
			console.log("nydn function: rg.ads.amazon.exe FAIL");
		}
	});
};
//SONOBI
rg.ads.sonobi = {};
rg.ads.sonobi.url="http://mtrx.go.sonobi.com/morpheus.nydailynews.6654.js";
rg.ads.sonobi.waitingList = [];
rg.ads.sonobi.download = function(){
	requirejs(rg.ads.sonobi.waitingList, function(util) {
		rg.ads.sonobi.setup();
	});
};
rg.ads.sonobi.setup = function(){
	requirejs([rg.ads.sonobi.url], function(util) {
		console.log("nydn function: rg.ads.sonobi.download SUCCESS");
		sbi_morpheus.enableReactiveSizes();
		sbi_morpheus.register('div-gpt-ad-'+rg.ads.wide, 'b2d486d7815142a5d9b3');
		sbi_morpheus.register('div-gpt-ad-'+rg.ads.box, 'ebfb261c83ba67a16a8e');
		sbi_morpheus.register('div-gpt-ad-'+rg.ads.interstitial, 'ebfb261c83ba67a16a8e');
		console.log("nydn function: rg.ads.sonobi.setup");
	});
};
rg.ads.sonobi.exe = function(){
	//console.log("nydn function: rg.ads.sonobi.exe");
	requirejs(rg.ads.dfp.waitingList, function(util) {
		// googletag.cmd.push(function(){sbi_morpheus.callOperator()});
		console.log("nydn function: rg.ads.sonobi.exe SUCCESS");
	});
};
//OPENX
rg.ads.openx = {};
rg.ads.openx.url="http://ox-d.nydailynews.servedbyopenx.com/w/1.0/jstag?nc=4692832-NYDN";
rg.ads.openx.waitingList = [];
rg.ads.openx.download = function(){
	requirejs(rg.ads.openx.waitingList, function(util) {
		rg.ads.openx.setup();
		//openxSetup();
	});
};
rg.ads.openx.setup = function(){
	requirejs([rg.ads.openx.url], function(util) {
		console.log("nydn function: rg.ads.openx.download SUCCESS");
	});
};
var openxSetup = function(){
	requirejs([rg.ads.openx.url], function(util) {
		console.log("nydn function: rg.ads.openx.download SUCCESS");
	});
};
//JUMPSTART
var jagvars = {}
rg.ads.jumpstart={};
rg.ads.jumpstart.url="http://nexus.ensighten.com/hearst/jumpstartauto/Bootstrap.js";
rg.ads.jumpstart.setup = function(){
	jagvars = {
		"year": "2015",
		"make": "null",
		"model": "null",
		"style": "null",
		"fuel": "null",
		"type": "None",
		"sitename": "nydailynews.com",
		"prod": "gallery",
		"site": "dna.gallery.new.dfp",
		"adunit": "dna.gallery.new.dfp",
		"sub": "null"
	};
	console.log("nydn function: rg.ads.jumpstart.setup SUCCESS");
};
rg.ads.jumpstart.download = function(){
	requirejs([rg.ads.jumpstart.url], function(util) {
		console.log("nydn function: rg.ads.jumpstart.download SUCCESS");
	});
}
//DFP
rg.ads.section = "Homepage";
rg.ads.dfp = {};
rg.ads.dfp.url="http://www.googletagservices.com/tag/js/gpt.js";
rg.ads.dfp.waitingList = [];
rg.ads.dfp.defineSlotStr = "4692832/NYDN/";
rg.ads.dfp.download = function(){
        requirejs(rg.ads.dfp.waitingList, function(util) {
           	// (function() {
// 			var gads = document.createElement("script");
// 			gads.async = true;
// 			gads.type = "text/javascript";
// 			var useSSL = "https:" == document.location.protocol;
// 			gads.src = (useSSL ? "https:" : "http:") + "//www.googletagservices.com/tag/js/gpt.js";
// 			 var node =document.getElementsByTagName("script")[0];
// 			 node.parentNode.insertBefore(gads, node);
//            	})();
           	rg.ads.dfp.setup();
	});
};
rg.ads.dfp.setup = function(){
	requirejs([rg.ads.dfp.url], function(util) {
		console.log("nydn function: rg.ads.dfp.download SUCCESS ");
		googletag.cmd.push(function() {
			var mappingATFwide = googletag.sizeMapping().
				addSize([728, 90], [728, 90]).
				addSize([320, 50], [320, 50]).
				addSize([0, 0], [320, 50]).
				build();
			var mappingATFbox = googletag.sizeMapping().
				addSize([728, 100], [300, 250], [300, 600]).
				addSize([320, 50], [320, 50]).
				addSize([0, 0], [320, 50]).
				build();
			var mappingInterstitial = googletag.sizeMapping().
				addSize([728, 100], [300, 250], [640,480]).
				addSize([320, 50], [300,250]).
				addSize([0, 0], [300, 250]).
				build();

			if (nydn.bidder.contains("jumpstart")) 	{
				rg.ads.dfp.defineSlotStr = "/2909/dna.gallery.new.dfp";
			}else{
				rg.ads.dfp.defineSlotStr+=rg.ads.section;
			}

			rg.ATFwide =  googletag
				.defineSlot(rg.ads.dfp.defineSlotStr,[[320,50],[728,90],[970,250],[990,90]], "div-gpt-ad-"+rg.ads.wide)
				.addService(googletag.pubads())
				.defineSizeMapping(mappingATFwide)
				.setTargeting("position", rg.ads.wide);

			rg.ATFbox= googletag
				.defineSlot(rg.ads.dfp.defineSlotStr, [[300, 250], [300, 600]], "div-gpt-ad-"+rg.ads.box)
				.addService(googletag.pubads())
				.defineSizeMapping(mappingATFbox)
				 .setTargeting("position", rg.ads.box);

			rg.ATFinterstitial= googletag
				.defineSlot(rg.ads.dfp.defineSlotStr, [[300, 250], [640, 480]], "div-gpt-ad-"+rg.ads.interstitial)
				.addService(googletag.pubads())
				.defineSizeMapping(mappingInterstitial)
				 .setTargeting("position", rg.ads.interstitial);

			console.log("nydn function: rg.ads.dfp.setup");

			if (nydn.bidder.contains("amazon")) rg.ads.amazon.exe();

			googletag.pubads().enableSingleRequest();
			googletag.pubads().disableInitialLoad();
			googletag.enableServices();

			if (nydn.bidder.contains("jumpstart")) 	rg.ads.jumpstart.download();
			if (nydn.bidder.contains("lotame") && rg.platform !=="mobile") 	rg.ads.lotame.download();

			console.log("nydn function: rg.ads.dfp.exe SUCCESS");
			rg.ads.refresh("cover");
			//if($("body.cover").length) rg.ads.refresh("cover");
		});
	});
};
//LOTAME
rg.ads.lotame = {};
rg.ads.lotame.waitingList = [];
rg.ads.lotame.getURL = function(){
	rg.ads.lotame.url = get_cc_extr_url();
};
rg.ads.lotame.download = function(){
	requirejs(rg.ads.lotame.waitingList, function(util) {
		rg.ads.lotame.setup();
	});
};
rg.ads.lotame.setup = function(){
	requirejs([rg.ads.lotame.url], function(util) {
		console.log("nydn function: rg.ads.lotame.download SUCCESS");
	});
};
rg.ads.lotame.exe = function(){
	console.log("nydn function: rg.ads.lotame.exe");
};
function get_cc_extr_url(){
	var domain=".crwdcntrl.net";
	var noDomainCookie=true;
	var start=document.cookie.indexOf("_cc_domain");
	if(start>-1){
		var valStartDc=document.cookie.indexOf("=",start);
		if(valStartDc>0){
			noDomainCookie=false;
			valStartDc++;
			var valEndDc=document.cookie.indexOf(";",valStartDc);
			valEndDc=valEndDc>0?valEndDc:document.cookie.length;
			domain=document.cookie.slice(valStartDc,valEndDc)
		}
	}
	var idCookie=false;
	if(noDomainCookie){
		var id;start=document.cookie.indexOf("_cc_id");
		if(start>-1){
			var valStartId=document.cookie.indexOf("=",start);
			if(valStartId>0){
				idCookie=true;
				valStartId++;
				var valEndId=document.cookie.indexOf(";",valStartId);
				valEndId=valEndId>0?valEndId:document.cookie.length;
				id=document.cookie.slice(valStartId,valEndId)
			}
		}
	}
	var cc_url="http://ad"+domain;
	if(typeof portNumber!="undefined"&&portNumber!=null) cc_url=cc_url+":"+portNumber;cc_url=cc_url+"/5/c="+cc_client_id+"/pe=y/callback="+cc_extr_callback;
	if(idCookie)	cc_url=cc_url+"/pid="+id;
	return cc_url
};
function ccauds(data) {
    var dartCCKey = "ccaud";
    var dartCC = "";
    if (typeof(data) != 'undefined') {
        for (var cci = 0; cci < data.Profile.Audiences.Audience.length; cci++) {
            if (cci > 0 && data.Profile.Audiences.Audience[cci].abbr != "") dartCC += ",";
            dartCC += data.Profile.Audiences.Audience[cci].abbr;
        }
        requirejs([rg.ads.dfp.url], function(util) {
		googletag.cmd.push(function() {
			googletag.pubads().setTargeting(dartCCKey, [dartCC]);
			console.log("nydn function: rg.ads.lotame.exe SUCCESS");
		});
	});
    }
};
rg.ads.amazon.potentialList = [];
rg.ads.sonobi.potentialList = [rg.ads.amazon.url];
rg.ads.openx.potentialList = [rg.ads.amazon.url, rg.ads.sonobi.url];
rg.ads.dfp.potentialList = [rg.ads.amazon.url, rg.ads.sonobi.url, rg.ads.openx.url];
rg.ads.lotame.potentialList = [rg.ads.amazon.url, rg.ads.sonobi.url, rg.ads.openx.url, rg.ads.dfp.url];

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
//tried to move this function call into rg.share.init method but does not work consistently. sometimes rg.share.init fires before the FB object is returned. since the
//gallery and the fb object are being called asynchronously, there's no guarantee when this method will be fired. leaving it global for now
window.fbAsyncInit = function() {
	FB.init({
	appId: 107464888913,
	xfbml: true,
	version: 'v2.1',
	status:true
	});
};

//INITIALIZATION
////WHEN DO WE WANT TO INITIALIZE TWITTER via require.js
! function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0]; if (!d.getElementById(id)) {js = d.createElement(s); js.id = id; js.src = "http://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs); } }(document, "script", "twitter-wjs");

rg.dtm = {};
//rg.dtm.url = "http://assets.adobedtm.com/4fc527d6fda921c80e462d11a29deae2e4cf7514/satelliteLib-c91fdc6ac624c6cbcd50250f79786de339793801.js";
rg.dtm.url = "http://assets.adobedtm.com/4fc527d6fda921c80e462d11a29deae2e4cf7514/satelliteLib-da908e6bde51fb816810b1957f7c6a5b5bb4fc79-staging.js";
rg.dtm.url2 = "http://assets.adobedtm.com/4fc527d6fda921c80e462d11a29deae2e4cf7514/scripts/satellite-55676c0f3838340017ec0a00.js";
rg.dtm.download = function(){
// 	var dtm = document.createElement("script");
// 	dtm.type = "text/javascript";
// 	dtm.src = "//assets.adobedtm.com/4fc527d6fda921c80e462d11a29deae2e4cf7514/satelliteLib-da908e6bde51fb816810b1957f7c6a5b5bb4fc79-staging.js";
// 	var dtmNode =document.getElementsByTagName("script")[0];
// 	dtmNode.parentNode.insertBefore(dtm, dtmNode);
	requirejs([rg.dtm.url], function(util) {
		console.log("nydn function: rg.dtm.download SUCCESS");
		_satellite.pageBottom();
	});
}
rg.dtm.downloadNext = function(){
	 requirejs([rg.dtm.url2], function(util) {
		console.log("nydn function: rg.dtm.download 2 SUCCESS");
		_satellite.pageBottom();
	});
}


Array.prototype.contains = function ( needle ) {
   for ( var i in this) {
       if (this[i] == needle) return true;
   }
   return false;
}