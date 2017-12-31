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

// Initiate Map
function initMap() {
	
	//clear the div that will be filled with the showPlaceList function
	document.getElementById('placeList').innerHTML='<br/>';
					
    var paris = {lat: 47.5133138, lng: 19.0565847}; //paris: {lat: 48.8704907, lng: 2.3309359};  
		
	var placeTypes = ['bar'];


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
                }, j*1000);    // }, j*1000);


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

var s = ' ';
try {
  for (var i = 0; i < placeObject.reviews.length; i++) {

      s +=  'Neve: ' + placeObject.reviews[i].author_name + '<br/>';
      s +=  'Vélemény: ' + placeObject.reviews[i].text + '<br/>';
      s +=  'Értékelés: ' + placeObject.reviews[i].rating + '<br/>';
      s +=  '<br/>';
  }
}catch(err) {
s=' Nincsenek vélemények ';
document.getElementById("alertbox").style.display = 'show'; 
document.getElementById("error").innerHTML += 
'<strong>'+placeObject.name +'</strong>: nincsenek értékelései' + '<br/>' ; //err.message;
}
  return s;

}

function showPlaceList(placeObject, index){
	var placeList = document.getElementById('placeList');
	//placeList.innerHTML='asd'+'<br/>'+'asd';
	
	var open = 'panel-default'; //if open_now is undefined, the class will be panel-default
	var isOpen = '  ';
	try{
	if(placeObject.opening_hours.open_now == true)
	{
		open='panel-success';
		isOpen = 'Most: nyitva';
	}else if(placeObject.opening_hours.open_now == false){
		open='panel-danger';
		isOpen = 'Most: zárva';
	}
	}catch(err){
		isOpen = ' (nincs megadva nyitvatartás) ';
		document.getElementById("alertbox").style.display = 'show';
		document.getElementById("error").innerHTML  += 
		'<strong>'+placeObject.name +'</strong>: nincs megadva nyitvatartás' + '<br/>' ; } //err.message;}
	
	var basicinfosDiv ='<div class="panel-group">'+
		'<div id="formatted_address_'+index+'" class="panel panel-default">'+
			'<a data-toggle="collapse" href="#collapse_formatted_address_'+index+'" class="panel-default">'+
				'<div class="panel-heading" >'+'Alap adatok'+'</div>'+
			'</a>'+
		'<div id="collapse_formatted_address_'+index+'" class="panel-collapse collapse in panel-body">'+
			'Cím: '+placeObject.formatted_address+
		'</div>'+
		'</div class="panel-default">'+
		
		'</div class="panel-group">';
		
	var contactDiv = '<div class="panel-group">'+
		'<div id="contact_'+index+'" class="panel panel-default">'+
			'<a data-toggle="collapse" href="#collapse_contact_'+index+'" class="panel-default">'+
				'<div class="panel-heading" >'+'Kapcsolat'+'</div>'+
			'</a>'+
		'<div id="collapse_contact_'+index+'" class="panel-collapse collapse out panel-body">'+
			'Address: \t\t'+placeObject.formatted_address+'<br/>'+
			'Phone: \t\t'+placeObject.international_phone_number+'<br/>'+
			'Web: \t\t'+placeObject.website+'<br/>'+
		'</div id="collapse_contact_">'+
		'</div class="panel-default">'+
		'</div class="panel-group">';
	
	var reviewsDiv = '<div class="panel-group">'+
		'<div id="reviews_'+index+'" class="panel panel-default">'+
			'<a data-toggle="collapse" href="#collapse_reviews_'+index+'" class="panel-default">'+
				'<div class="panel-heading" >'+'Értékelések'+'</div>'+
			'</a>'+
		'<div id="collapse_reviews_'+index+'" class="panel-collapse collapse out panel-body">'+
			reviewsList(placeObject) +
		'</div id="collapse_contact_">'+
		'</div class="panel-default">'+
		'</div class="panel-group">';
	var weekday_text=' ';
	try{
	for(o = 0; o < placeObject.opening_hours.weekday_text.length ; o++){
			weekday_text += placeObject.opening_hours.weekday_text[o]+'<br/>';
			}
	}catch(err){
		weekday_text=' nincs megadva ';
		//document.getElementById("error").innerHTML += placeObject.name +': nincs megadva nyitvatartási idő' + '<br/>' ; 
		}//err.message;}	
	
	var openDiv = '<div class="panel-group">'+
		'<div id="open_'+index+'" class="panel '+open+'">'+
			'<a data-toggle="collapse" href="#collapse_open_'+index+'" class="'+open+'">'+
				'<div class="panel-heading" >'+'Nyitvatartás \t\t ('+isOpen+')</div>'+
			'</a>'+
		'<div id="collapse_open_'+index+'" class="panel-collapse collapse out panel-body">'+
			weekday_text +
		'</div id="collapse_contact_">'+
		'</div class="panel-default">'+
		'</div class="panel-group">';
	
	placeList.innerHTML+=''+
	'<div class="container">'+
	'<div class="panel-group">'+
	'<div id="name_'+index+'" class="panel '+open+'">'+
		'<a data-toggle="collapse" href="#collapse_name_'+index+'" class="'+open+'">'+
			'<div class="panel-heading" >'+placeObject.name+'</div>'+
		'</a>'+
    
	'<div id="collapse_name_'+index+'" class="panel-collapse collapse out panel-body">'+' '+
		
		basicinfosDiv+
		openDiv +
		reviewsDiv +
		contactDiv +
		
	'</div id="collapse" class="panel-body">'+
	
	
	'</div class="open">'+
	'</div class="panel-group">'+
	'</div class="container">';
	


}

