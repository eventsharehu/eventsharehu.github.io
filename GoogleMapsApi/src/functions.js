/*
Load html pages
*/
$(document).ready(function() {
$('#menu').load('navbar.html');
});
   
/*
TODO: This would be enough to load, when the settings button is clicked
*/
/*
$(document).ready(function() {
$('#settings').load('settings.html');
});
  */ 

//Load settings html to the Modal, when its opened
$(document).on('shown.bs.modal','#settingsModal', function () {
//    alert('hi');
//    $('#myInput').trigger('focus')
 $("#settingsModalBody").load("settings_01.html");
})

  
  
//tab-content
   

/* Set the width of the side navigation to 350px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    document.getElementById("mySidenav").style.width = "350px";
    document.getElementById("fullpage").style.marginLeft = "350px";
   // document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("fullpage").style.marginLeft = "0";
 //   document.body.style.backgroundColor = "black";

}

/*
Toogle a div's display property (for the error box)
*/
function toggleContent(divID) {
  // Get the DOM reference
  var contentId = document.getElementById(divID);
  // Toggle 
  contentId.style.display == "block" ? contentId.style.display = "none" : 
contentId.style.display = "block"; 
}
   
/* switching between the tabs in listing-tab 
	This is show/hide divs, but we should load html to tab-content div
*/
$('#myTabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

/*
load html page to tab-content div
*/


function loadTab(url){
//	var asd = 'navbar.html';
//    document.getElementById('tab-content').innerHTML = asd;
	
 $("#tab-content").load(url);

 
 }


 
function asd(){window.alert('asd called');} 

/*
Turns a number into stars rating
*/
$.fn.stars = function() {
    return $(this).each(function() {
        // Get the value
        var val = parseFloat($(this).html());
        // Make sure that the value is in 0 - 5 range, multiply to get width
        var size = Math.max(0, (Math.min(5, val))) * 16;
        // Create stars holder
        var $span = $('<span />').width(size);
        // Replace the numerical value with stars
        $(this).html($span);
    });
}

/*
Toogle the listing-tab div to fullscreem
*/
function fullscreen(){
    $('#listing-tab').toggleClass('fullscreen'); 
    $('#tab-content').toggleClass('fullscreen');
}

/*
Calculate a distance of 2 gps coordinate
*/
function haversineDistance(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)

  return d;
}

function get_orientation(){
$(window).on('load', function() {
    $('img').addClass(function() {
        if (this.height === this.width) {
            return 'square';
        } else if (this.height > this.width) {
            return 'portrait';
        } else {
            return 'landscape';
        }
    });
});
}


/*
listing-tab with horizontal scrollable arrow icon
*/


// duration of scroll animation
var scrollDuration = 300;
// paddles
var leftPaddle = document.getElementsByClassName('left-paddle');
var rightPaddle = document.getElementsByClassName('right-paddle');
// get items dimensions
var itemsLength = $('.item').length;
var itemSize = $('.item').outerWidth(true);
// get some relevant size for the paddle triggering point
var paddleMargin = 20;

// get wrapper width
var getMenuWrapperSize = function() {
	return $('.menu-wrapper').outerWidth();
}
var menuWrapperSize = getMenuWrapperSize();
// the wrapper is responsive
$(window).on('resize', function() {
	menuWrapperSize = getMenuWrapperSize();
});
// size of the visible part of the menu is equal as the wrapper size 
var menuVisibleSize = menuWrapperSize;

// get total width of all menu items
var getMenuSize = function() {
	return itemsLength * itemSize;
};
var menuSize = getMenuSize();
// get how much of menu is invisible
var menuInvisibleSize = menuSize - menuWrapperSize;

// get how much have we scrolled to the left
var getMenuPosition = function() {
	return $('.menu').scrollLeft();
};

// finally, what happens when we are actually scrolling the menu
$('.menu').on('scroll', function() {

	// get how much of menu is invisible
	menuInvisibleSize = menuSize - menuWrapperSize;
	// get how much have we scrolled so far
	var menuPosition = getMenuPosition();

	var menuEndOffset = menuInvisibleSize - paddleMargin;

	// show & hide the paddles 
	// depending on scroll position
	if (menuPosition <= paddleMargin) {
		$(leftPaddle).addClass('hidden');
		$(rightPaddle).removeClass('hidden');
	} else if (menuPosition < menuEndOffset) {
		// show both paddles in the middle
		$(leftPaddle).removeClass('hidden');
		$(rightPaddle).removeClass('hidden');
	} else if (menuPosition >= menuEndOffset) {
		$(leftPaddle).removeClass('hidden');
		$(rightPaddle).addClass('hidden');
}

	// print important values
	$('#print-wrapper-size span').text(menuWrapperSize);
	$('#print-menu-size span').text(menuSize);
	$('#print-menu-invisible-size span').text(menuInvisibleSize);
	$('#print-menu-position span').text(menuPosition);

});

// scroll to left
$(rightPaddle).on('click', function() {
	$('.menu').animate( { scrollLeft: menuInvisibleSize}, scrollDuration);
});

// scroll to right
$(leftPaddle).on('click', function() {
	$('.menu').animate( { scrollLeft: '0' }, scrollDuration);
});
//# sourceURL=pen.js
