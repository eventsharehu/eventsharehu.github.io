console.log('settings loaded');

/*
        // Try HTML5 geolocation.
if (navigator.geolocation) {
	//determine the current position with magic and give it to the getPosition function
	navigator.geolocation.getCurrentPosition(getPosition);
	window.alert('Success geolocation');
	window.alert(JSON.stringify(navigator.geolocation.getCurrentPosition()));
}else{window.alert('location failed'); }
 
//Give the recieved position datas to the myPos object
function getPosition(position) {
	myPos.lat = position.coords.latitude;
	myPos.lng = position.coords.longitude;
	window.alert('position given to myLocation');
	
} 
*/

function getCoords(){
	window.alert('getCoords called - Starting to locate coords without timeout');
        // Try HTML5 geolocation.
if (navigator.geolocation) {
	//determine the current position with magic and give it to the getPosition function
	navigator.geolocation.getCurrentPosition(getPosition);
}
 
//Give the recieved position datas to the myPos object
function getPosition(position) {
	myPos.lat = position.coords.latitude;
	myPos.lng = position.coords.longitude;
	
	window.alert('new coords set');
	//initMap();
} 	
	
}//function getCoords


function myinitMap(){
if (navigator.geolocation) {
	
var optn = {
			enableHighAccuracy : false,
			timeout : 5000,
			maximumAge : 0
		};
	
	
console.log('geolocation is supported');					
// Get the user's current position
navigator.geolocation.getCurrentPosition(showPosition, showError, optn);
} else {
	console.log('Geolocation is not supported in your browser');
}


//Dummy one, which will result in a working next statement.
navigator.geolocation.getCurrentPosition(function () {}, function () {}, {});
//The working next statement.

//Success callback function
function showPosition(position) {
		 
		myPos.lat=position.coords.latitude; 
		myPos.lng=position.coords.longitude;
		
initMap();
}//showPosition

//Error callback function
function showError(error) {
	switch(error.code) {
		case error.PERMISSION_DENIED:
			console.log("User denied the request for Geolocation.");
			break;
		case error.POSITION_UNAVAILABLE:
			console.log("Location information is unavailable.");
			break;
		case error.TIMEOUT:
			console.log("The request to get user location timed out.");
			break;
		case error.UNKNOWN_ERROR:
			console.log("An unknown error occurred.");
			break;
	}
//Locate position by ip if get error with html5 geolocation API
//	It will be used if you try geolocation in Chrome without https and it timeouts	
$.getJSON('https://ipinfo.io/geo', function(response) { 
        var loc = response.loc.split(',');
		myPos.lat = parseFloat(loc[0]); 
		myPos.lng = parseFloat(loc[1]);
		initMap();
		}); 

}//showError

}//myinitMap


	//This positions can be select from the menu
	// The determined current position is the first in the menu
	// (it's value is (0,0) if the geolocation doesn't working)

	/*var places = [
	myPos,
	{lat: 47.5133138, lng: 19.0565847},
	{lat: 47.5670783, lng: 19.7137274},
	{lat: 47.6913011, lng: 19.1213873},
	{lat: 47.4978303, lng: 19.0522515}
];	
	*/
	//The default value of the dropdown menu
	// This index will change, if an other location is choosen  
// var selectedplaceindex = "0";	


	//If the dropdown menu's value changed, give the new value to the selectedplaceindex, and the myLocation
	//	then re-init the map
 $('#centerselect').change(function () {  
	selectedplaceindex = $(this).find("option:selected").val();	
//	$(".test").text(selectedplaceindex);   

	myLocation = places[parseInt(selectedplaceindex, 10)];
	window.alert(selectedplaceindex);
	
 });	
	
					//Shoow the checkboxlist in the div where it is called
					function checkBoxList(){
						document.getElementById('check-list-box').innerHTML =''+
							'<li class="list-group-item" id="'+placeTypes_all[0][0]+'" data-checked="true">'+
							'<img src="'+placeTypes_all[0][2]+'" style="max-height: 20px; margin-right:10px; margin-left:10px;" />'+
							placeTypes_all[0][1]+'</li>';
							
						//'<li class="list-group-item" data-checked="true">bar</li>';
						for(i=1; i<placeTypes_all.length; i++){
							document.getElementById('check-list-box').innerHTML +=''+
							'<li class="list-group-item" id="'+placeTypes_all[i][0]+'">'+
							'<img src="'+placeTypes_all[i][2]+'" style="max-height: 20px; margin-right:10px; margin-left:10px;" />'+
							placeTypes_all[i][1]+'</li>';
						}//for
					}//function


   function getcheckeddata(){
       // event.preventDefault(); 
		placeTypes = [];
        var checkedItems = {}, counter = 0;
        $("#check-list-box li.active").each(function(idx, li) {
            checkedItems[counter] = $(li).text();
			placeTypes.push($(li).prop("id"));
            counter++;
        });
       // window.alert(JSON.stringify(placeTypes, null, '\t'));
		
    }
	

function submit() {
	
	selectedplaceindex = document.getElementById("centerselect").value;	
	myLocation = places[parseInt(selectedplaceindex, 10)];
	radius = parseInt(document.getElementById("radius").value);
	getcheckeddata();
	
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
 

// window.alert(keywords);
 
  radius = parseInt(document.getElementById("radius").value);

document.getElementById("error").innerHTML = "";

//TODO: listPlaces should be called only  if the "Helyek" tab is selected
  console.log(keywords);
  listPlaces();
  initMap();
//  closeNav(); 


  }
  
//	listPlaces();

function getRadius(){
	window.alert(document.getElementById("radius").value);
	
}
















