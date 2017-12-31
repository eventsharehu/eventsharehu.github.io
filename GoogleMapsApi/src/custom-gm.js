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
var selectedplaceindex = "2";	

	//The center of the map
var myLocation = places[parseInt(selectedplaceindex, 10)];

	//If the dropdown menu's value changed, give the new value to the selectedplaceindex, and the myLocation
	//	then re-init the map
 $('#centerselect').change(function () {  
	selectedplaceindex = $(this).find("option:selected").val();	
	$(".test").text(selectedplaceindex);   

	myLocation = places[parseInt(selectedplaceindex, 10)];
	initMap(); 
 });	

var map;
var infowindow;
var searchwords = "agence+web";

// Initiate Map
function initMap() {
	
					//clear the div that will be filled with the showPlaceList function
					document.getElementById('placeList').innerHTML='asd'+'<br/>'+'asd';
					
    var paris = {lat: 47.5133138, lng: 19.0565847}; //paris: {lat: 48.8704907, lng: 2.3309359};  
		
	var placeTypes = ['bar', 'restaurant' ];


    map = new google.maps.Map(document.getElementById('map'), {
        center: myLocation,
        zoom: 18,
        styles: [{
            stylers: [{ visibility: 'simplified' }]
        }, {
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
        }]
    });

			//The center of the map
    var myCircle = {
      strokeColor: '#4286f4',
      strokeOpacity: 0.5,
      strokeWeight: 2,
      fillColor: '#4286f4',
      fillOpacity: 0.2,
      map: map,
      center: map.getCenter(),
      radius: 500
    }

	
    infowindow = new google.maps.InfoWindow();

    // Add the circle for this city to the map.
    cityCircle = new google.maps.Circle(myCircle);

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
          location: myLocation,
          ///radius: 500,  
		  types: placeTypes,
		  //  keyword: "(söröző) OR (Burger*)",
		  rankBy: google.maps.places.RankBy.DISTANCE
    }, callback);
}

var placeDetails = [];

function callback(results, status) {
    console.log(results.length+ ' db összesen');
   // console.log(results);
    if (status === google.maps.places.PlacesServiceStatus.OK) {
		placeDetails = [];
        for (var i = 0; i < results.length; i++) {

            //Using setTimeout and closure because limit of 10 queries /second for getDetails */
            (function (j) {
                var request = {
                    placeId: results[i]['place_id']
                };

                service = new google.maps.places.PlacesService(map);
                setTimeout(function() {
                    service.getDetails(request, callback);
                }, j*10);    // }, j*1000);


            })(i);

            function callback(place, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    createMarker(place);
                    console.log(place.name + ' index: ' + placeDetails.length ); //results.length + placeDetails.length);
					
					showPlaceList(place, placeDetails.length);
					
                    placeDetails.push([place.name, place.id]);

                } //if service status.OK
            }// function callback
        }//for
    }//if service status.OK
}//function callback

function createMarker(place) {
    var photos = place.photos;
    if (!photos) {
        return;
    }
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name,
        icon: photos[0].getUrl({'maxWidth': 50, 'maxHeight': 50})
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name + " : " + place.website);
        infowindow.open(map, this);
    });
}//function createMarker


/*

Bálint függvénye

*/


function reviewsList(placeObject){

var s = "";
  for (var i = 0; i < placeObject.reviews.length; i++) {

      s +=  "Neve: " + placeObject.reviews[i].author_name + "\n";
      s +=  "Vélemény: " + placeObject.reviews[i].text + "\n";
      s +=  "Értékelés: " + placeObject.reviews[i].rating + "\n";
      s +=  "\n";
  }
  return s;

}

function showPlaceList(placeObject, index){
	var placeList = document.getElementById('placeList');
	//placeList.innerHTML='asd'+'<br/>'+'asd';
	
	var open = 'panel-default'; //if open_now is undefined, the class will be panel-default
	if(placeObject.opening_hours.open_now == true)
	{
		open='panel-success';
	}else if(placeObject.opening_hours.open_now == false){
		open='panel-danger';
	}
	
	placeList.innerHTML+=''+
	'<div class="container">'+
	'<div class="panel-group">'+
	'<div id="name_'+index+'" class="panel '+open+'">'+
		'<a data-toggle="collapse" href="#collapse_name_'+index+'" class="'+open+'">'+
			'<div class="panel-heading" >'+placeObject.name+'</div>'+
		'</a>'+
    
	'<div id="collapse_name_'+index+'" class="panel-collapse collapse out panel-body">'+'Adatok'+
		
		'<div class="panel-group">'+
		'<div id="formatted_address_'+index+'" class="panel panel-default">'+
			'<a data-toggle="collapse" href="#collapse_formatted_address_'+index+'" class="panel-default">'+
				'<div class="panel-heading" >'+'formatted_address'+'</div>'+
			'</a>'+
		'<div id="collapse_formatted_address_'+index+'" class="panel-collapse collapse in panel-body">'+placeObject.formatted_address+'</div>'+
		'</div class="panel-default">'+
		'</div class="panel-group">'+
		
		
		'<div class="panel-group">'+
		'<div id="contact_'+index+'" class="panel panel-default">'+
			'<a data-toggle="collapse" href="#collapse_contact_'+index+'" class="panel-default">'+
				'<div class="panel-heading" >'+'Contact'+'</div>'+
			'</a>'+
		'<div id="collapse_contact_'+index+'" class="panel-collapse collapse out panel-body">'+
			'formatted_address: '+placeObject.formatted_address+
		'</div id="collapse_contact_">'+
		'</div class="panel-default">'+
		'</div class="panel-group">'+
		
		
	'</div id="collapse" class="panel-body">'+
	
	
	'</div class="open">'+
	'</div class="panel-group">'+
	'</div class="container">';
	//placeList.innerHTML+='<div id="address_'+index+'"><p>address: '+placeObject.formatted_address+'</p></div>';
	
document.getElementById('log').innerText = placeObject.name;
/*
document.getElementById('name').innerText = placeObject.address_components[1].long_name + " " + placeObject.address_components[0].short_name;
document.getElementById('phone').innerText = placeObject.international_phone_number;
if(placeObject.opening_hours.open_now == true){
  document.getElementById('open_Now').innerText = "Nyitva";
    $(document).ready(function(){
      $('.alert-danger').remove();
    });
} else {
  $(document).ready(function(){
      $('.alert-success').remove();
  });
  document.getElementById('open_Not').innerText = "Zárva";
}
document.getElementById('reviews').innerText = reviewsList(placeObject);
*/
}

