
	
//initialize my current location
//if the geolocation doesn't working, it's value stays 0
var myPos = {lat: 0, lng: 0};

        // Try HTML5 geolocation.
    if (navigator.geolocation) {
	//determine the current position with magic and give it to the getPosition function
        navigator.geolocation.getCurrentPosition(getPosition);
    }
 
//Give the recieved position datas to the myPos object
function getPosition(position) {
myPos.lat = position.coords.latitude;
myPos.lng = position.coords.longitude;
} 

//This positions can be select from the menu
// The determined current position is the first in the menu
// (it's value is (0,0) if the geolocation doesn't working)
var places = [
myPos,
{lat: 47.5133138, lng: 19.0565847},
{lat: 47.5670783, lng: 19.7137274},
{lat: 47.6913011, lng: 19.1213873},
{lat: 47.4978303, lng: 19.0522515}
];	

//The default value of the dropdown menu
// This index will change, if an other location is choosen  
var selectedplaceindex = "0";		
 $('#centerselect').change(function () {  
 selectedplaceindex = $(this).find("option:selected").val();	
 $(".test").text(selectedplaceindex);   
 initMap(); 
 //TODO: Collapse the menu in mobile view
 });	
 

 

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      var map;
      var infowindow;  	   
	  function initMap() {      
	  var myLocation = places[parseInt(selectedplaceindex, 10)];	  //$(this).find("option:selected").text();	  //{lat: 47.565107, lng: 19.715893};
    //    var myLocation = {lat: 47.5133138, lng: 19.0565847};

		
        map = new google.maps.Map(document.getElementById('map'), {
          center: myLocation,
          zoom: 18
        });

var placeTypes = [
'bar' ];

		var request = {
          location: myLocation,
          ///radius: 500,  
		  types: placeTypes,
		//  keyword: "(söröző) OR (Burger*)",
		  rankBy: google.maps.places.RankBy.DISTANCE
        };
		


        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
      }

var bars = [];
bars.push( { "Name":"whatever" } );

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          
document.getElementById('proba').innerHTML="<ul>";
		  for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);

document.getElementById('proba').innerHTML+='<li>Név:\t\t'+results[i].name;
document.getElementById('proba').innerHTML+="<ul><li>Nyitva:\t\t"+results[i].opening_hours.open_now+"</li>"+
"<li>Értékelés:\t\t"+results[i].rating+"</li>"+
"<li>Place id:\t\t"+results[i].place_id+"</li>"+
"<li>Nyitvatartás:\t\t"+JSON.stringify(results[i].opening_hours.weekday_text)+"</li>"+
"<li><a href=https://maps.googleapis.com/maps/api/place/details/json?placeid="+results[i].place_id+"&key=AIzaSyCs3TZ0EDhCvd2F-q9Xtj9yl8LbS8Eh1Rg&libraries=places&callback=initMap>Teljes adatlap (JSON object)</a></li>"+
"</ul></li><br/><br/>";
		//	document.getElementById('proba').innerHTML=JSON.stringify(results[i]);

		//	document.getElementById('proba2').innerHTML+=JSON.stringify(results[i].name)+"\tnyitva:"+JSON.stringify(results[i].opening_hours.open_now)+"<br/>";
          }//for vége
document.getElementById('proba').innerHTML+="</ul>";
        }
      }
	  
      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }
  