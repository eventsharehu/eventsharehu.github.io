
	
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

//The center of the map
var myLocation = places[parseInt(selectedplaceindex, 10)];

 $('#centerselect').change(function () {  
 selectedplaceindex = $(this).find("option:selected").val();	
 $(".test").text(selectedplaceindex);   

myLocation = places[parseInt(selectedplaceindex, 10)];
 initMap(); 

//createCustomMarker();
	 
	 
 //TODO: Collapse the menu in mobile view
 });	
 


      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      var map;
      var infowindow;  	   
	  function initMap() {      
	      
		
        map = new google.maps.Map(document.getElementById('map'), {
          center: myLocation,
          zoom: 18
        });

		//The center of the map
    var myCircle = new google.maps.Circle({
      strokeColor: '#4286f4',
      strokeOpacity: 0.5,
      strokeWeight: 2,
      fillColor: '#4286f4',
      fillOpacity: 0.2,
      map: map,
      center: map.getCenter(),
      radius: 3
    });  

	
		
var placeTypes = [
'bar', 'restaurant' ];

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
//end of initMap declaration
	  
	  results = '';
      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          
		  
document.getElementById('proba').innerHTML='<br/>';
//document.getElementById('proba').innerHTML="<ul>";
		  for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);

			
//TODO: Listázás formázása
//Ha nincs találat, akkor ne maradjanak ott az előző keresés eredményei
/*
document.getElementById('proba').innerHTML+='<li>Név:\t\t'+results[i].name;
document.getElementById('proba').innerHTML+="<ul><li>Nyitva:\t\t"+results[i].opening_hours.open_now+"</li>"+
"<li>Értékelés:\t\t"+results[i].rating+"</li>"+
"<li>Place id:\t\t"+results[i].place_id+"</li>"+
"<li>Nyitvatartás:\t\t"+JSON.stringify(results[i].opening_hours.weekday_text)+"</li>"+
"<li><a href=https://maps.googleapis.com/maps/api/place/details/json?placeid="+results[i].place_id+"&key=AIzaSyCs3TZ0EDhCvd2F-q9Xtj9yl8LbS8Eh1Rg&libraries=places&callback=initMap>Teljes adatlap (JSON object)</a></li>"+
"</ul></li><br/><br/>";
	*/
$.getJSON('https://maps.googleapis.com/maps/api/place/details/json?placeid='+results[i].place_id+'&key=AIzaSyCs3TZ0EDhCvd2F-q9Xtj9yl8LbS8Eh1Rg&libraries=places&callback=initMap', function(data) {
    //data is the JSON string
	
	document.getElementById('proba').innerHTML+= 'asd';
	//'<p>Név:\t\t'+results[i].name+'</p>';

	
});//getJSON	
		}//for vége
//document.getElementById('proba').innerHTML+="</ul>";
        }
      }
	//end of function callback declaration

	
      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

	      function createCustomMarker(){
	     // TODO: The custom marker will be the profile images
//	TODO: https://stackoverflow.com/questions/46416883/how-add-circle-shape-in-google-maps-custom-icon		 
		//TODO: Create a marker in myLocation, 
		// with profile picture (if avaiable)
		// that will be the center of the map
		var markerimage = document.getElementById('profilepicture').getElementsByTagName('img')[0].src;
		console.log('profilepicture location: ' + document.getElementById('profilepicture').getElementsByTagName('img')[0].src);
		var icon = {
    url: markerimage, // url
  //  scaledSize: new google.maps.Size(30, 30), // scaled size
	
        path: google.maps.SymbolPath.CIRCLE,
        scale: 30,
        fillColor: "#F00",
        fillOpacity: 0.5,
        strokeWeight: 0.8,
   // origin: new google.maps.Point(0,0), // origin
   // anchor: new google.maps.Point(15, 15) // anchor
};
		  var marker = new google.maps.Marker({
          position: myLocation,
          map: map,
	  icon: icon,
       //set optimized to false otherwise the marker  will be rendered via canvas 
       //and is not accessible via CSS
       optimized:false,
          title: 'Hello World3!'
        });
	      }
	      

	      
	      
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
