/*
Load html pages
*/
$(document).ready(function() {
$('#menu').load('navbar.html');
});
   
/*
TODO: This would be enough to load, when the settings button is clicked
*/
$(document).ready(function() {
$('#settings').load('settings.html');
});
   
   

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
   
/* switching between the tabs in listing-tab */
$('#myTabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

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

