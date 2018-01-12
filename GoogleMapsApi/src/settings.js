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
	//initMap(); 
	
 });	
	
    var paris = {lat: 47.5133138, lng: 19.0565847}; //paris: {lat: 48.8704907, lng: 2.3309359};  
	var radius = 1500;
	var keywords_array = [];
	var keywords = ""; //"(söröző) OR (Burger*)",
	var placeTypes = [""]; //["bar"]
		
	//icon location: https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png 	
	var placeTypes_all= ["accounting",
"airport",
"amusement_park",
"aquarium",
"art_gallery",
"atm",
"bakery",
"bank",
"bar",
"beauty_salon",
"bicycle_store",
"book_store",
"bowling_alley",
"bus_station",
"cafe",
"campground",
"car_dealer",
"car_rental",
"car_repair",
"car_wash",
"casino",
"cemetery",
"church",
"city_hall",
"clothing_store",
"convenience_store",
"courthouse",
"dentist",
"department_store",
"doctor",
"electrician",
"electronics_store",
"embassy",
"fire_station",
"florist",
"funeral_home",
"furniture_store",
"gas_station",
"gym",
"hair_care",
"hardware_store",
"hindu_temple",
"home_goods_store",
"hospital",
"insurance_agency",
"jewelry_store",
"laundry",
"lawyer",
"library",
"liquor_store",
"local_government_office",
"locksmith",
"lodging",
"meal_delivery",
"meal_takeaway",
"mosque",
"movie_rental",
"movie_theater",
"moving_company",
"museum",
"night_club",
"painter",
"park",
"parking",
"pet_store",
"pharmacy",
"physiotherapist",
"plumber",
"police",
"post_office",
"real_estate_agency",
"restaurant",
"roofing_contractor",
"rv_park",
"school",
"shoe_store",
"shopping_mall",
"spa",
"stadium",
"storage",
"store",
"subway_station",
"synagogue",
"taxi_stand",
"train_station",
"transit_station",
"travel_agency",
"university",
"veterinary_care",
"zoo"
];

	function submit() {
  document.getElementById('test').text = 'asd';
  keywords_array = ($("#keywords").tagsinput('items') || ['']);
  keywords = "";
  if(keywords_array.length>1){
	var i = 0;  
	for (i = 0; i < keywords_array.length-1; i++) { 
		keywords += "(" + keywords_array[i] + ") AND ";
	}//for
	keywords += "(" + keywords_array[i] + ") ";
  }//if
  else if(keywords_array.length>0){keywords = keywords_array[0];}
  document.getElementById('test').text = keywords;
  
  
  radius = document.getElementById("radius").value;


  console.log(keywords);
  initMap();
}


