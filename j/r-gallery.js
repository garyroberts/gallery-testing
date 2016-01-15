jQuery(document).ready(function(){

	var rgLength;
	var rgSlideOrder = 1;

	rgJSON();


});




function rgJSON(){


	// if(gHome.indexOf("?") === -1){
	// 	gHomeURL= gHome;
	// 	gID = gHome.substr(gHome.indexOf("-gallery-")+9);
	// }else{
	// 	gHomeURL= gHome.slice(0, gHome.indexOf("?") );
	// 	gID = gHome.substr(gHome.indexOf("?pmSlide=")+9);
	// }


	jQuery.getJSON( "json/gallery.json")
		.done(function( data ) {
			var gData = data; //JSON
			console.log( "NYDN - JSON SUCCESS" );
			rgLength = jQuery( gData.images ).length;
			rgImages(gData);


		})
		.fail(function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
			console.log( "NYDN - JSON FAIL - " + err );

	});

}





//IMAGE PRELOADING
function rgImages(gData){
	console.log(gData);
	var count = 0;
	var imgCount = "img"+count;
	jQuery(gData.images).each(function(i){
		var imgCount = new Image();
		imgCount.src = this.originalSrc;
		console.log(this.originalSrc);
		count++;
	});
	console.log("done preloading images");

}

//NEXT
jQuery("#rg-next").on( "click", function(e){

	e.preventDefault();
	if( rgSlideOrder == rgLength ){
		rgSlideOrder = 1;
	}else{
		rgSlideOrder++;
	}

});