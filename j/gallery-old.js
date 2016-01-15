function NOV30(){}
// FUNCTIONS USED FOR BOTH VERSIONS
/***** G SHARE *****/
function gShare(){
    var gTitle = jQuery("[data-short-header]"),
        sTitle = jQuery("#s-title"),
        sCaption = jQuery("#s-caption"),
        gDescription = jQuery("#g-description"),
        gImage = jQuery("#g-image");

    gShareMedia = gImage.length ? gImage.attr("src") : "http://multimedia.nydailynews.com/css/gallery/icon/share-logo.jpg";
    if ( jQuery("#g-body[data-s-order=1]").length){
        gShareTitle = gTitle.length ?  gTitle.attr('data-short-header') : document.title;
        gShareDescription = gDescription.length ? gDescription.text() : document.title;
    }else{
        gShareTitle = sTitle.length ?  gTitle.attr('data-short-header')+" - "+sTitle.text() : document.title,
        gShareDescription = sCaption.length ? sCaption.text() : document.title;
    }
    //gGigya();
}

function gBitlyClick(){
	jQuery("#g-bitly").on( "click", function(){
		if( jQuery("#g-bitly-wrap").is(":visible") ){
			jQuery("#g-bitly-wrap").hide();
		}else{
			jQuery("#g-bitly-wrap").show();
			jQuery("#g-wrap").not("#g-bitly").click(function(e){
				jQuery("#g-bitly-wrap").hide();
			});
			jQuery("#g-gigya-reaction3-icon div").hover(function(e) {
				jQuery("#g-bitly-wrap").hide();
			});
		}
	});
}

// onLoad event handler.
// function onLoadHandler(event){
//     if(loginId.length > 0) jQuery('input[id$="gigya.services.socialize.plugins.share.showShareUI_tbYourEmail"]').val(loginId);
// }

/***** onSendDone *****/
function onSendDoneHandler(event){
    var path = jQuery(".logger").attr("loggerPath"),
        id = jQuery(".logger").attr("loggerId");
    if ( event.providers ) {
        if (event.providers == 'email') {
            // add this to email logger
            jQuery('.logger').empty();
            jQuery('.logger').append('<img src="/logger/p.gif?type=EMAILED&d='+path+'&a='+id+'"/>');
        }
        else{
            // add this to share logger
            jQuery('.logger').empty();
            jQuery('.logger').append('<img src="/logger/p.gif?type=SOCIALNETWORK&d='+path+'&a='+id+'"/>');
        }
        //DTM
        //_satellite.setVar('Gigya Share Provider', event.providers);
        //_satellite.setVar("Gigya Share Location", "Side");
        //_satellite.track('GigyaSendDone');
    }
}

/***** G GIGYA *****/
// function gGigya(){
//     if (jQuery("#g-share").length){
//         var gURL= jQuery("#g-slide").attr("data-s-url");
//         act = new gigya.services.socialize.UserAction();
//         act.setTitle(gShareTitle);
//         act.setLinkBack(gURL);
//         act.setDescription(gShareDescription);
//         act.addMediaItem({ type:'image', src:gShareMedia, href:gShareMedia });
//         var gSection = "gallery" +" - "+ jQuery("body").attr("id") +" - "+ "side";

//         var showShareBarUI_params=
//         {
//             layout:'vertical',
//             containerID: 'g-gigya',
//             shareButtons: [
//             { provider: 'Facebook'},
//             { provider: 'Twitter'},
//             { provider: 'reddit'},
//             { provider: 'share'},
//             { provider: 'Email'},
//             { provider: 'print'}
//             ],
//             moreEnabledProviders: "stumbleupon, googleplus, digg, tumblr",
//             showCounts: 'right',
//             displayCountThreshold: 1,
//             userAction: act,
//             onLoad: onLoadHandler,
//             onSendDone: onSendDoneHandler,
//             noButtonBorders: true,
//             iconsOnly: true,
//             cid: gSection
//         }
//         gigya.services.socialize.showShareBarUI({},showShareBarUI_params);
//     }
// }

/***** G HEADERS *****/
function gHeaders(){
    jDocument.on("click", "#g-description.collapsed",   function(){ jQuery(this).removeClass("collapsed").addClass("expanded",100);     });
    jDocument.on("click", "#g-description.expanded",    function(){ jQuery(this).removeClass("expanded").addClass("collapsed",100);     });

    jDocument.on("click", "#s-info:not(.expanded)", function(){
    	jQuery(this).addClass("expanded",100, function(){
    		if(jQuery("span[id^=GGADad_ii]").length){
				var gFooterOffset = jQuery(".g-image-wrap footer").offset();
				var gImgOffset = jQuery("#g-image").offset();
				var gImgH = jQuery("#g-image").height();
				var gImgBottom = gImgOffset.top + gImgH;
				var gFooterH = jQuery(".g-image-wrap footer").height();
				var gFooterExpandedH = jQuery("#s-info").outerHeight();
				var gFooterExpandedOffset = gFooterOffset.top - ( gFooterExpandedH - gFooterH );
	    		if( gImgBottom >= gFooterExpandedOffset){
    				jQuery("span[id^=GGADad_ii]").addClass("gumgumHide");
	    		}
    		}
    	});
 	});

    jDocument.on("click", "#s-info.expanded", function(){
    	jQuery(this).removeClass("expanded", function(){
    		if(jQuery("span[id^=GGADad_ii]").length){
    			jQuery("span[id^=GGADad_ii]").removeClass("gumgumHide");
    		}
    	});
 	});

    jQuery("html").click(function(e) {
        var container1 = jQuery("#g-description.expanded");
        var container2 = jQuery("#s-info.expanded");
        if (!container1.is(e.target) && container1.has(e.target).length === 0) jQuery("#g-description.expanded").removeClass("expanded").addClass("collapsed",100);
        if (!container2.is(e.target) && container2.has(e.target).length === 0) jQuery("#s-info.expanded").removeClass("expanded").addClass("collapsed",100);
    });
}
/***** G RESET HEADERS *****/
function gResetHeaders(){
    var gBody = jQuery("#g-body"),
        gTitle = jQuery("#g-title"),
        sTitle = jQuery("#s-title"),
        gDescription= jQuery("#g-description"),
        sInfo= jQuery("#s-info"),
        sCaption= jQuery("#s-caption"),
        sByline= jQuery("#s-byline"),
        // gPintrest= jQuery("#g-pintrest"),
        gImage  = jQuery("#g-image");

    if (gTitle.height() >= 50) gBody.addClass("gTitle2Lines");
    else gBody.removeClass("gTitle2Lines");

    if (gTitle.height() >= 75) gBody.addClass("gTitle3Lines");
    else gBody.removeClass("gTitle3Lines");

    if(gDescription.length){
        if (gDescription[0].scrollHeight -11 <= gDescription.outerHeight()) gDescription.removeClass("collapsed");   //check if description is longer than its container
        else gDescription.addClass("collapsed");
    }

    if(sCaption.length){
        if (sCaption[0].scrollHeight -11 <= sCaption.outerHeight()) sInfo.removeClass("expandable");   //check if description is longer than its container
        else sInfo.addClass("expandable");
    }

    if(sByline.length && jQuery.trim(sByline.html()) != ""){ sInfo.addClass("expandable"); }

    if (sTitle.height() > 22) sInfo.addClass("long");
    else sInfo.removeClass("long");

	// if (!jQuery("#g-outbrain-endslate").length){
	// 	gPintrest();
	// }

}

function gPintrest(){

   	var gBody = jQuery("#g-body"),
        sCaption= jQuery("#s-caption"),
        gDescription= jQuery("#g-description"),
        gPintrest= jQuery("#g-pintrest"),
        gImage  = jQuery("#g-image");

    //HANDLE PINTREST IMAGE SRC FOR PROD VS QA
    var gImageSrc = gImage.attr("src");
        if(gImageSrc.indexOf("http://") >= 0){
        	gImageSrc = gImageSrc;
        }else{
        	gImageSrc = "http://wwwqa.nydailynews.com"+gImageSrc;
        }

	if (gPintrest.length) {


		gPintrest.removeClass("on");

        gShareMedia = gImage.length ? gImageSrc : "http://multimedia.nydailynews.com/css/gallery/icon/share-logo.jpg";

        if ( jQuery("#g-body[data-s-order=1]").length) gShareDescription = gDescription.length ? gDescription.text() : document.title;
        else gShareDescription = sCaption.length ? sCaption.text() : document.title;
        gPintrest.find("a").attr("href","//www.pinterest.com/pin/create/button/?url="+window.location.href+"&media="+gShareMedia+"&description="+gShareDescription);

        setTimeout(function() {
        	if(!jQuery("#g > .g-autos-endslate").length ){
				var pintrestOffsetLeft = gImage.offset().left + 10;
				var gImageTop = parseInt(gImage.css("margin-top")) - 9;
				gPintrest.css("top", gImageTop);
				gPintrest.offset({left: pintrestOffsetLeft}).addClass("on",100);
			}
        }, 400);
	}
}

/***** OUTBRAIN ENDSLATE *****/
function gEndslate(){
	jQuery("#g-pintrest").removeClass("on");
    canonicalURL = jQuery("link[rel='canonical']").attr("href").replace("wwwqa","www");

    if(jQuery("#autos").length ){
    	if (jQuery(".g-autos-endslate").length) {
    		jQuery(".g-autos-endslate").clone().appendTo("#g").fadeIn(500);
    	};


    }else{
	    jQuery("#g").append('<div id="g-outbrain-endslate"><div class="OUTBRAIN" data-src='+canonicalURL+' data-widget-id="AR_6" data-ob-template="nydn"></div></div>');
		OBR.extern.researchWidget(1);
    }
}




/***** AD INTERSTITIAL *****/
function gInterstitial(adID, SlideNo){
    jQuery(document).ready(function(){
        gInterstitialCounter = 1;
        jDocument.on("click", "a.g-next", function(e) {
            if (jQuery("#gInterstitial").length) jQuery("#gInterstitial").remove();
            gInterstitialCounter++;
            if ( !(gInterstitialCounter % SlideNo) && (gInterstitialCounter > 1) && (!jQuery("#g-body.replay").length) && (!jQuery("#g-outbrain-wrapper").length) ){
                jQuery("body").addClass("gInterstitialed");
                if (jQuery(".GG_ad").length) jQuery(".GG_ad").css("opacity","0");
                jQuery("#g").append("<div id='gInterstitial'><div id='"+adID+"' class='gInterstitial-ad'><div id='g-iframe-wrap'><script>googletag.cmd.push(function() { googletag.display('"+adID+"'); });</scr"+"ipt></div></div></div>");
                jQuery("#gInterstitial").fadeIn();

                googletag.pubads().refresh();

                jQuery('#gInterstitial').on('click', function(e) {
                    e.preventDefault();
                    jQuery("#gInterstitial").fadeOut();
                    if (jQuery(".GG_ad").length) jQuery(".GG_ad").css("opacity","1");
                    jQuery("body").removeClass("gInterstitialed");
                });
            }
        });
    });
}

function gAds(){
    //ADS
    _satellite.track("Prev Next Photo Gallery");
    if(typeof COMSCORE != 'undefined') {
        COMSCORE.beacon({ c1:2, c2:7190388, c3:"", c4:"", c5:"", c6:"", c15:"" });
        var mediaUrl = 'http://multimedia.nydailynews.com/includes/modules/pv.txt?ts=' + new Date().getTime();
        jQuery.get(mediaUrl);
        //console.log("COMSCORE called 2");
    }
    if(typeof OMTRSlideshowPageView == 'function') {
        OMTRSlideshowPageView();
        //console.log("OMTRSlideshowPageView called 2");
    }
    if(typeof _gaq != 'undefined')  _gaq.push(['_trackPageview', window.location.href]);
    if(typeof _vrtrack != 'undefined')  _vrtrack();
    var d = new Image(1, 1);
    d.onerror = d.onload = function () { d.onerror = d.onload = null; };
    d.src = ["//secure-us.imrworldwide.com/cgi-bin/m?ci=us-805104h&cg=0&cc=1&si=", escape(window.location.href), "&rp=", escape(document.referrer), "&ts=compact&rnd=", (new Date()).getTime()].join('');

    sCounter++;


    if (!(sCounter % sCounterDiv) && (sCounter > 1)){

    	//Amazon Ads Do Not Appear On Autos Galleries
    	if( !jQuery("body#autos").length ){
	    	amznads.getAdsCallback('3088', function(){
	    		amznads.setTargetingForGPTAsync('amznslots');
	    		console.log("AMAZON: amznads.setTargetingForGPTAsync('amznslots')");
	    	});
	    	console.log("AMAZON: amznads.getAdsCallback('3088', function(){amznads.setTargetingForGPTAsync('amznslots'); })");
			googletag.pubads().clearTargeting('amznslots');
			console.log("AMAZON: googletag.pubads().clearTargeting('amznslots')");
		}

	    if( jQuery("#div-gpt-ad-x46").length ){
	    	googletag.pubads().refresh([galleryx46]);
	    	console.log("NYDN x46 Refreshed");
	    }

	    if( jQuery("#div-gpt-ad-x50").length ){
	    	googletag.pubads().refresh([galleryx50]);
	    	console.log("NYDN x50 Refreshed");
	    }

	    if( jQuery("#div-gpt-ad-x55").length ){
	    	googletag.pubads().refresh([galleryx55]);
	    	console.log("NYDN x55 Refreshed");
	    }

    }

}







// **********************************************
// **********************************************
// **********************************************
// FUNCTIONS UNIQUE TO NON-JSON VERSION

function gClicker() {
    jDocument.on("click", "a.g-next, a.g-prev", function(e) {
        if (!jQuery(e.target).parents(".g-more").length) {
            e.preventDefault();
            gTarget = jQuery(e.target);
            gHREF = jQuery(this).attr("href");
            gLoad(jQuery(this).attr("href"));
        }
    });
}
function gKeydown() {
    jDocument.bind('keydown', function(e) {
        if ( (e.which == 39) || (e.which == 37) ) {
            e.preventDefault();
            if (jQuery("#g-body").attr("data-s-order") == 1 && jQuery("#g-body .g-more").length) {
                jQuery("#g-body .g-more, #g-replay").fadeOut(100);
                jQuery("#g-image, #g-body footer, #g-description, #s-credits").fadeIn(500);
                jQuery("#g-body").removeClass("replay");
                localStorage.setItem('gReplay',"0");
                gResetHeaders();
                gCredits();
                jQuery("#g-body .g-more").remove();
            }else{
                if (e.which == 39) {
                    gHREF = jQuery(".g-next").attr("href");
                    if (jQuery(".g-next").hasClass("g-last")) localStorage.setItem('gReplay',"1");
                }
                else if (e.which == 37) gHREF = jQuery(".g-prev").attr("href");
                gLoad(gHREF);
            }
        }
    });
}

/***** G LOAD *****/
function gLoad(gHREF){
    jQuery(loadWrap).load(gHREF+loadImport, function(){
        if (!IE89) history.pushState(null, null, gHREF);
        gReset();
    });
}

/***** G RESET *****/
function gReset(){
    //SLIDE COUNTER
    jQuery("#g-body").attr("data-s-order",jQuery("#g-slide").attr("data-s-order"));

    //LAST SLIDE HANDELING
    if(typeof gTarget !== 'undefined' && gTarget !== null && ( gTarget.hasClass("g-last") || gTarget.parents("a").hasClass("g-last") ) ) {  localStorage.setItem('gReplay',"1");    }
    if (jQuery("#g-body").attr("data-s-order") == 1 && typeof localStorage.getItem('gReplay') !== 'undefined' && localStorage.getItem('gReplay') !== null && localStorage.getItem('gReplay') == 1) {   //if gReplay exists and true, clone and show more
        jQuery("#g-title").append("<span id='g-replay'>Replay</span>");
        gLastSlide();
    }
    else jQuery("#g-image").load(function(){
        gCredits();
        jQuery("#g-outbrain-endslate, .g-autos-endslate").hide();
    });
    jQuery("#g-replay").on("click", function(e) {
        gReplay();
        gCredits();
    });
    jQuery(window).resize(function() {
        gCredits();
        gResize();
    });
	gResetCommonFunctions();
}


function gShareMouseover(){
    jQuery("#g-share").on("mouseover", function(e){
        if (!updated){
            gShare();
            //gGigya();
            updated=1;
        }
    });
}

function gResize(){
    gResetHeaders();
    if(jQuery("#s-info.expanded").length){
    	jQuery("#s-info.expanded").removeClass("expanded").addClass("collapsed",100);
    }
    gPintrest();
}

function gLastSlide(){

	gEndslate();

    jQuery("#g-image, #g-body footer, #g-description, #s-credits").hide();
    jQuery("#g-body").addClass("replay");

	if( jQuery("#autos").length ){
	    if(!jQuery("#g > .g-autos-endslate").length){
	        jQuery("#g > .g-autos-endslate").show();
	        //alert("1");
	    }else{
	    	jQuery("#g-image, #g-body footer, #g-description, #s-credits").hide();
	    	jQuery("#g-replay, #g > .g-autos-endslate").fadeIn(500);
	    	//alert("2");
	    }
	}else{
	    if(!jQuery("#g-outbrain-endslate").length){
	        jQuery("#g-outbrain-endslate").show();
	    }else{
	    	jQuery("#g-image, #g-body footer, #g-description, #s-credits").hide();
	    	jQuery("#g-replay, #g-outbrain-endslate").fadeIn(500);
	    }
	}

}


function gSelection(){
    if(jQuery("#g-description").length) jQuery("#g-description").disableSelection();
    if(jQuery("#s-info").length) jQuery("#s-info").disableSelection();
}

function gReplay(){
	jQuery("#g-replay, #g-outbrain-endslate, #g > .g-autos-endslate").fadeOut(100);
	jQuery("#g-image, #g-body footer, #g-description, #s-credits").fadeIn(500);
	jQuery("#g-body").removeClass("replay");
	localStorage.setItem('gReplay',"0");
	jQuery("body #g-outbrain-endslate, #g > .g-autos-endslate").remove();
	gResetHeaders();
	if (!jQuery("#g-outbrain-endslate").length && !jQuery("#g > .g-autos-endslate").length ){
		gPintrest();
	}

}

function gCredits() {
    sCreditsRight = jQuery("#g-image").offset().left - 50;
    sCreditsTop = jQuery("#g-image").offset().top - parseInt(jQuery("#g-body").css("border-top-width")) +  + jQuery("#g-image").height();
    jQuery("#s-credits").css("right",sCreditsRight+"px").css("top",sCreditsTop+"px").fadeIn(100);
}


// **********************************************
// **********************************************
// **********************************************
// FUNCTIONS UNIQUE TO JSON VERSION

function gJsonCredits() {
	setTimeout(function() {
        sCreditsRight = jQuery("#g-image").offset().left - 50;
        sCreditsTop = jQuery("#g-image").offset().top - parseInt(jQuery("#g-body").css("border-top-width")) + jQuery("#g-image").height();
        if( !jQuery("#g-outbrain-endslate").is(":visible") && !jQuery("#g > .g-autos-endslate").is(":visible") ) {
        	jQuery("#s-credits").css("right",sCreditsRight+"px").css("top",sCreditsTop+"px").fadeIn(100);
		}
	}, 200);
}

function gNext() {
    jDocument.on("click", "a.g-next", function(e) {
        if (!jQuery(e.target).parents(".g-more").length) {
            e.preventDefault();
            gTarget = jQuery(e.target);
	    	if( gSlideOrder == gLength ){
	    		gSlideOrder = 1;
	    	}else{
	    		gSlideOrder++;
	    	}
			gJsonLoad();
        }
    });
}

function gPrev() {
	jDocument.on("click", "a.g-prev", function(e) {
		if (!jQuery(e.target).parents(".g-more").length) {
			e.preventDefault();
			gTarget = jQuery(e.target);
	    	if( gSlideOrder == 1 ){
	    		gSlideOrder = gLength;
	    	}else{
	    		gSlideOrder--;
	    	}
	        gJsonLoad();
    	}
    });
}

function gJsonKeydown() {
    jDocument.bind('keydown', function(e) {
        if ( (e.which == 39) || (e.which == 37) ) {
            e.preventDefault();
            if (jQuery("#g-body").attr("data-s-order") == 1 && jQuery("#g-body .g-more").length) {
                jQuery("#g-body .g-more, #g-replay").fadeOut(100);
                jQuery("#g-image, #g-body footer, #g-description, #s-credits").fadeIn(500);
                jQuery("#g-body").removeClass("replay");
                localStorage.setItem('gReplay',"0");
                gResetHeaders();
                gJsonCredits();
                jQuery("#g-body .g-more").remove();
            }else{
            	if( !jQuery("#g-replay").is(':visible') ){
	                if (e.which == 39) {
			            gTarget = jQuery(e.target);
				    	if( gSlideOrder == gLength ){
				    		gSlideOrder = 1;
				    	}else{
				    		gSlideOrder++;
				    	}
	                    if (jQuery(".g-next").hasClass("g-last")) localStorage.setItem('gReplay',"1");
	                }
	                else if (e.which == 37){
				    	if( gSlideOrder == 1 ){
				    		gSlideOrder = gLength;
				    	}else{
				    		gSlideOrder--;
				    	}
	                }
	                gJsonLoad();
                }
            }
        }
    });
}

/***** G LOAD *****/
function gJsonLoad(){
	gSlideID = gData.images[gSlideOrder -1].contentId;
	gPMslide = "?pmSlide="+gSlideID;
    if (!IE89){
    	if(gSlideOrder == 1){
    		history.pushState('', '', gHomeURL);
    	}else{
    		history.pushState('', '', gPMslide);
    	}
    }
    gJsonReset();
}

function gJsonReset(){
	//SLIDE COUNTER
	jQuery("#g-image").hide();
	jQuery("#g-pintrest").removeClass("on");
	jQuery("#g-body").attr( "data-s-order", gSlideOrder );

	//LAST SLIDE HANDELING
	if(gSlideOrder == gLength){
		jQuery(".g-next").addClass("g-last");
		if(typeof gTarget !== 'undefined' && gTarget !== null) {localStorage.setItem('gReplay',"1");}
	}else{
		jQuery(".g-next").removeClass("g-last");
	}


	//POPULATE
	// jQuery("#g-image").attr("src", gData.images[gSlideOrder -1].shareSrc).delay(10).show(10);


	//POPULATE
	jQuery("#g-image").attr("src", gData.images[gSlideOrder -1].shareSrc);

	//IF LAST SLIDE
    if (jQuery("#g-body").attr("data-s-order") == 1 && typeof localStorage.getItem('gReplay') !== 'undefined' && localStorage.getItem('gReplay') !== null && localStorage.getItem('gReplay') == 1) {   //if gReplay exists and true, clone and show more
        if( !jQuery("#g-replay").length ){
        	jQuery("#g-title").append("<span id='g-replay'>Replay</span>");
        }
        gLastSlide();
    }else{
		jQuery("#g-image").delay(10).show(10);

		if( jQuery("body #g-outbrain-endslate").length ){
			jQuery("body #g-outbrain-endslate").remove();
		}

		if( jQuery("#g > .g-autos-endslate").length ){
			jQuery("#g > .g-autos-endslate").remove();
		}


    };

	jQuery("#s-credits").hide();

	//G-DESCRIPTION - SHOW ONLY ON FIRST SLIDE
	if(gSlideOrder == 1){
		jQuery("#g-description").show();
	}else{
		jQuery("#g-description").hide();

	}
	if( jQuery("#g-body").hasClass("replay") ){
		jQuery("#g-description").hide();
	}


    jQuery("#g-replay").on("click", function(e) {
        gReplay();
        gJsonCredits();
    });



	jQuery("#g-image").one("load",function(){
		jQuery("#g-counter").html(" "+gSlideOrder+" <i>of</i> "+gLength+" ");
		jQuery("#s-title").html(gData.images[gSlideOrder -1].imagetitle);
		jQuery("#s-caption").html(gData.images[gSlideOrder -1].caption);
		jQuery("#s-credits").html(gData.images[gSlideOrder -1].credit);
		jQuery("#g-image").attr("alt",gData.images[gSlideOrder -1].alt);
		gJsonCredits();
		if (!jQuery("#g-outbrain-endslate").length && !jQuery("#g > .g-autos-endslate").length  ){
			gPintrest();
		}

	});


    jQuery(window).resize(function() {
    	gJsonCredits();
        gResize();
    });



    setTimeout(function() {
		gResetCommonFunctions();
	}, 300);







}

function gResetCommonFunctions(){
	gSelection();
	gResetHeaders();
	updated = 0;
	gShareMouseover();
	gAds();
}

function pmSlide(){
	gHome = window.location.href;
	if(gHome.indexOf("?") === -1){
		gHomeURL= gHome;
		gID = gData.images[0].contentId;
	}else{
		gHomeURL= gHome.slice(0, gHome.indexOf("?") );
		gID = gHome.substr(gHome.indexOf("?pmSlide=")+9);
	}
	var gImages = gData.images;
    jQuery(gImages).each(function( index ) {
    	if(this.contentId == gID) gSlideOrder = index+1;
	});
}


// **********************************************
// **********************************************
// **********************************************
// INITIAL TEST FOR JSON

function gJSON(){
	if(gHome.indexOf("?") === -1){
		gHomeURL= gHome;
		gID = gHome.substr(gHome.indexOf("-gallery-")+9);
	}else{
		gHomeURL= gHome.slice(0, gHome.indexOf("?") );
		gID = gHome.substr(gHome.indexOf("?pmSlide=")+9);
	}

	jQuery.getJSON( "/json/cmlink/"+gHomeId )
		.done(function( data ) {
			gData = data; //JSON
			console.log( "NYDN - JSON SUCCESS" );
		    if (!IE89) window.addEventListener("popstate", function(e) {
		        pmSlide();
		        //gJsonReset();
		    });
		    gNext();
		    gPrev();
		    gJsonKeydown();
		    gJsonCredits();
		    jQuery(window).resize(function() {
		    	gJsonCredits();
		        gResize();
		    });
		})
		.fail(function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
			console.log( "NYDN - JSON FAIL - " + err );
		    if (!IE89) window.addEventListener("popstate", function(e) {
		        gHREF = window.location.href;
		        jQuery(loadWrap).load(gHREF+loadImport, function(){ gReset(); });
		    });
		    gClicker();
		    gKeydown();
		    gReset();
	});

}




// **********************************************
// **********************************************
// **********************************************
// SHOW STARTS HERE

jQuery(document).ready(function(e){
	if (!!window.clipboardData) { jQuery("body").addClass("msie"); }
	localStorage.setItem('gReplay',0);

    var gTarget;
    var thisHREF;

	loadWrap = "#g-body";
	loadImport = " #g-body > *" ;

    gHomeId = jQuery("#g").attr("data-gallery-id");

    gId = "";
	gHome = window.location.href;
	gSlideOrder = jQuery("#g-body").attr("data-s-order");
    sCounter = 0;

    //AUTOS Gallery Ads Refreshed Every 3 Slides - ALL OTHER Gallery Ads Refreshed Every 5 Slides
    sCounterDiv = jQuery("body#autos").length ? 3 : 5;
    jQuery("#g-body").removeClass("replay");
    gLength = jQuery("#g-body").attr("data-g-length");
    if (htmlStorage && typeof localStorage.getItem('gBaseURL') !== 'undefined' && localStorage.getItem('gBaseURL') !== null) { jQuery(".g-close").attr("href",localStorage.getItem('gBaseURL'));}

    gJSON();
    gShare();
	gBitlyClick();
	gHeaders();
	gResetHeaders();


	if (!jQuery("#g-outbrain-endslate").length && !jQuery("#g > .g-autos-endslate").length){
		gPintrest();
	}



    //FACEBOOK INITIALIZATION
	(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) {return; } js = d.createElement(s); js.id = id; js.src = "//connect.facebook.net/en_US/sdk.js"; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'facebook-jssdk'))



	gFacebookClick();
	gTwitter();

});




//FACEBOOK
window.fbAsyncInit = function() {
	FB.init({
	appId: 107464888913,
	xfbml: true,
	version: 'v2.1',
	status:true
	});

	var title = document.getElementById('og_url');

	function getContent() {
		return FB.ui({
			method: 'share',
			href: title.getAttribute('content')
		});
	}

	var button = document.querySelector('.g-share-facebook');
	if (window.addEventListener) {
		button.addEventListener('click', getContent);
	} else {
		button.attachEvent('click', getContent);
	}
};

//DTM TRACKING FOR FACEBOOK CLICKS
function gFacebookClick(){
	if (typeof _satellite.track == 'function'  &&  jQuery(".g-share-facebook").length) {
		jQuery(".g-share-facebook").on( "click", function(){
			_satellite.track("FacebookShare");
		});
	}
}

// TWITTER
	//INITIALIZATION
! function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0]; if (!d.getElementById(id)) {js = d.createElement(s); js.id = id; js.src = "http://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs); } }(document, "script", "twitter-wjs");

function gTwitter(){
	var tTitle = jQuery('meta[property="twitter:title"]').attr("content");
	var tUrl = jQuery('#g-share').attr("data-bitly-url");
	twttr.ready(
	  function (twttr) {
			twttr.widgets.createShareButton(
			    tUrl,
			    document.getElementsByClassName('g-share-twitter')[0], {
			        text: tTitle,
			        size: 'large'
			    }
			);
			twttr.events.bind(
			    'click',
			    function(ev) {
			        if (typeof _satellite.track == 'function'  &&  jQuery(".g-share-twitter").length) {
			        	_satellite.track("TwitterShare");
			    	}
			    }
			);
	  	}
	);
}

