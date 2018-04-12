
      function CenterControl(controlDiv, map) {

        var controlUI = document.createElement('button');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to recenter the map';
        controlDiv.appendChild(controlUI);

		
        // Set image for the button
        var buttonImage = document.createElement('img');
        buttonImage.src = 'img/gps.svg';
        buttonImage.height  = '20';
        controlUI.appendChild(buttonImage);
		
		/*
        // Set text for the button
        var controlText = document.createElement('button');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '16px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Center Map';
        controlUI.appendChild(controlText);
*/
		
		
        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener('click', function() {
          map.setCenter(myLocation);
        });

      }

var map;
var infowindow;

// Initiate Map
function initMap() {
	


    map = new google.maps.Map(document.getElementById('map'), {
        center: myLocation,
        zoom: 16,
        styles: [{
            stylers: [{ visibility: 'simplified' }] 
        }, {
            elementType: 'labels',
            stylers: [{ visibility: 'on' }]
        }]
    });
	
			//The center of the map
    var myCircle = {
      strokeColor: '#4286f4',
      strokeOpacity: 0.3,
      strokeWeight: 2,
      fillColor: '#4286f4',
      fillOpacity: 0.1,
      map: map,
      center: map.getCenter(),
      radius: radius
    }
			//The center of the map
    var myPosCircle = {
      strokeColor: '#4286f4',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#4286f4',
      fillOpacity: 0.6,
      map: map,
      center: map.getCenter(),
      radius: 10
    }
    // Add the circle for this city to the map.
    cityCircle = new google.maps.Circle(myCircle);
    posCircle = new google.maps.Circle(myPosCircle);

	
    infowindow = new google.maps.InfoWindow();

        // Create the DIV to hold the control and call the CenterControl()
        // constructor passing in this DIV.
        var centerControlDiv = document.createElement('div');
        var centerControl = new CenterControl(centerControlDiv, map);

        centerControlDiv.index = 1;
        map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(centerControlDiv);
		
		/*
		initAutoComplete
		*/

        // Create the search box and link it to the UI element.
        var myinput = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(myinput);
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(myinput);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });	



	 
}//initMap 

var placeDetails = [];
var photoreference = '';
var orientation = 'lancdscape';
var distance = 0;
var place_id = '';
var name = '';
var address = '';
var bounds = '';
var placeId = '';



/*
Create Custom Marker with HTML div
https://humaan.com/blog/custom-html-markers-google-maps/
*/

/*
function CustomMarker(latlng, map, args) {
	this.latlng = latlng;	
	this.args = args;	
	this.setMap(map);	
}

CustomMarker.prototype = new google.maps.OverlayView();

CustomMarker.prototype.draw = function() {
	
	var self = this;
	
	var div = this.div;
	
	if (!div) {
	
		div = this.div = document.createElement('div');
		
		div.className = 'marker';
		
		div.style.position = 'absolute';
		div.style.cursor = 'pointer';
		div.style.width = '20px';
		div.style.height = '20px';
		div.style.background = 'blue';
		
		if (typeof(self.args.marker_id) !== 'undefined') {
			div.dataset.marker_id = self.args.marker_id;
		}
		if (typeof(self.args.colour) !== 'undefined') {
			div.style.background = self.args.colour;
		}

/*		
		google.maps.event.addDomListener(div, "click", function(event) {
			alert('You clicked on a custom marker!');			
			google.maps.event.trigger(self, "click");
		});
*/
		google.maps.event.addDomListener(div, "click", function(event) {
        infowindow.setContent("asd" + " : " + "qwe");
        infowindow.open(map, this);
					google.maps.event.trigger(self, "click");

    });
	
		var panes = this.getPanes();
		panes.overlayImage.appendChild(div);
	}
	
	var point = this.getProjection().fromLatLngToDivPixel(this.latlng);
	
	if (point) {
		div.style.left = (point.x - 10) + 'px';
		div.style.top = (point.y - 20) + 'px';
	}
};

CustomMarker.prototype.remove = function() {
	if (this.div) {
		this.div.parentNode.removeChild(this.div);
		this.div = null;
	}	
};

CustomMarker.prototype.getPosition = function() {
	return this.latlng;	
};

*/
	
/*
End of creating HTML Marker
Eample to use it:
	overlay = new CustomMarker(
		myLatlng, 
		map,
		{
			marker_id: '123'
		}
	);
*/


/*
Create HTML Marker
*/


    function HTMLMarker(lat,lng){
        this.lat = lat;
        this.lng = lng;
        this.pos = new google.maps.LatLng(lat,lng);
    }
    
    HTMLMarker.prototype = new google.maps.OverlayView();
    HTMLMarker.prototype.onRemove= function(){}
    
    //init your html element here
    HTMLMarker.prototype.onAdd= function(){
        div = document.createElement('DIV');
        div.className = "arrow_box";
      div.innerHTML = "<img src='data:image/jpeg;base64,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' alt=''>";
        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);
    }
    
    HTMLMarker.prototype.draw = function(){
        var overlayProjection = this.getProjection();
        var position = overlayProjection.fromLatLngToDivPixel(this.pos);
        var panes = this.getPanes();
        panes.overlayImage.style.left = position.x + 'px';
        panes.overlayImage.style.top = position.y - 30 + 'px';
    }

	
function asd(){
    //to use it
    var htmlMarker = new HTMLMarker(44.73532729516236, 14.806330871582077);
    htmlMarker.setMap(map);
}//function asd

/*
End of create html marker
*/


		
function listPlaces(){
	
	//clear the div that will be filled with the showPlaceList function
	document.getElementById('placeList').innerHTML=''+
	'';
	
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
          location: myLocation,
          radius: radius,  
		  types: placeTypes,
		  keyword: keywords
		 // rankBy: google.maps.places.RankBy.DISTANCE
    }, callback );  //}, callback);
	
function callback(results, status) {
    console.log(results.length+ ' db összesen');
   // console.log(results);
    if (status === google.maps.places.PlacesServiceStatus.OK) {
		placeDetails = [];
		
        for (var i = 0; i < results.length; i++) {
		//createMarker(results[i]);

		lat = results[i].geometry.location.lat()
		lng = results[i].geometry.location.lng()
		distance = (haversineDistance(lat, lng, myLocation.lat, myLocation.lng)*1000).toFixed(0);
		name = results[i].name;
		address = results[i].vicinity;
		bounds=results[i].geometry.viewport;
		placeId = results[i].place_id
		
	var LatLngObject = new google.maps.LatLng(lat,lng);
	//window.alert(JSON.stringify(LatLngObject));
	
	overlay = new CustomMarker(
		new google.maps.LatLng(lat,lng), 
		map,
		{
			marker_id: '123',
			colour: 'Red'

		}
	);
	
	    


  
			console.log(results[i]);
			try{
				photoreference=results[i].photos[0].getUrl({'maxWidth': 500, 'maxHeight': 500});
			}catch(err) { photoreference='https://cdn.browshot.com/static/images/not-found.png'; }

		orientation = get_orientation(photoreference);
		
	document.getElementById('placeList').innerHTML+=''+
        '<div class="col-xs-12 col-sm-6 col-md-3 col-xl-2">'+
              '<div class="thumbnail">'+
                '<div class="thumbnail2"><img src="'+photoreference+'" alt="" class="img-responsive "></div>'+
                '<div class="caption">'+
                  '<h4 class="pull-right badge badge-xs">'+distance+' m</h4>'+
                  '<h4 ><a href="#" >'+name+'</a></h4>'+
                  '<p>'+address+'</p>'+
                '</div>'+
	'<span class="stars">'+results[i].rating+'</span> '+results[i].rating+'/5<br/>'+
                '<div class="space-ten"></div>'+
                '<div class="btn-ground text-center">'+
                    '<button type="button" class="btn btn-primary" onclick="toogleBounds('+lat+', '+lng+')"><i class="glyphicon glyphicon-map-marker"></i>&nbsp;</button>'+
                    '<button id="'+placeId+'" type="button" class="btn btn-primary" data-toggle="modal" data-target="#placeDetailsModal" onclick="listPlaceDetails(\''+placeId+'\')" ><i class="fa fa-search"></i> Részletek</button>'+
                '</div>'+
                '<div class="space-ten"></div>'+
              '</div>'+
            '</div>'+
'';
			
			
        }//for
	
/*
After get all spans with ratings in it,
show the stars instead
*/		
$(function() {
    $('span.stars').stars();
});

/*
Add orientation classes for images
*/
get_orientation();
			

    }//if service status.OK
	else{console.log('hiba2 (nearbysearch): ' + status);}
}//function callback
}//function listPlaces

/*
End of listPlaces
*/



/*
Start listPlaces2
*/
		
function listPlaces2(){
	
	//clear the div that will be filled with the showPlaceList function
	document.getElementById('placeList').innerHTML=`<br/>`;
	
	
	
	
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
          location: myLocation,
          radius: radius,  
		  types: placeTypes,
		  keyword: keywords
		 // rankBy: google.maps.places.RankBy.DISTANCE
    }, callback );  //}, callback);	document.getElementById('placeList').innerHTML+='qwe';

	
	
function callback(results, status) {



    if (status === google.maps.places.PlacesServiceStatus.OK) {
		placeDetails = [];

		
/*
TODO:
 - a href: thumbnail when click to image, open the full-size image in a modal
   120x120px is  the image, so we should create a 120x(120-16px) a tag that href to the full-sized image 
 - when click to starrating, open a modal, where you can give a rating to that place, if you logged in whith Google profile
 
*/	
	
		
        for (var i = 0; i < results.length; i++) {
		createMarker(results[i])
		lat = results[i].geometry.location.lat()
		lng = results[i].geometry.location.lng()
		distance = (haversineDistance(lat, lng, myLocation.lat, myLocation.lng)*1000).toFixed(0);
		name = results[i].name;
		address = results[i].vicinity;
		bounds=results[i].geometry.viewport;
		placeId = results[i].place_id
		
			console.log(results[i]);
			try{
				photoreference=results[i].photos[0].getUrl({'maxWidth': 500, 'maxHeight': 500});
			}catch(err) { photoreference='https://cdn.browshot.com/static/images/not-found.png'; }

		orientation = get_orientation(photoreference);
		
	document.getElementById('placeList2').innerHTML+=`
					<li>
						
						<div class="thumb" style="background-image: url(`+photoreference+`); background-repeat: no-repeat; background-size: cover; background-position: center;" >
						
						<span class="stars mystarrating">`+results[i].rating+`</span>
						<span class="mystarratingvalue">`+results[i].rating+`/5</span>
						</div>
												
						<div class="info">
							<h2 class="title">`+name+`</h2>
							<p class="desc">`+address+`<br/>
							</p>
							<ul>								
								<li style="width:33%; color: green;"  onclick="toogleBounds(`+lat+`, `+lng+`)" ><span class="glyphicon glyphicon-map-marker" ></span></li>
								<li style="width:33%; color: green;" class="fa fa-info" data-toggle="modal" data-target="#placeDetailsModal" onclick="listPlaceDetails('`+placeId+`')" ><span  ></span></li>
								<li style="width:33%; color: green;"  onclick="window.alert('Fejlesztés alatt!')" ><span class="fa fa-location-arrow"> `+distance+` m</span></li>
							</ul>
						</div>
					</li> `;
			
        }//for
		
/*
After the for loop
*/

/*
After get all spans with ratings in it,
show the stars instead
*/		
$(function() {
    $('span.stars').stars();
});

/*
Add orientation classes for images
*/
get_orientation();
			

    }//if service status.OK
	else{console.log('hiba2 (nearbysearch): ' + status);}
	
	
			
document.getElementById('placeList').innerHTML+='asd';
}//function callback
}//function listPlaces



/*
End of listPlaces2
*/








function toogleBounds(lat, lng){
map.setCenter({'lat': lat, 'lng': lng});
//	map.fitBounds(bounds);
	//window.alert(map.getZoom());
	//TODO: setZoom if needed
}

function listPlaceDetails(placeId){
	 var service = new google.maps.places.PlacesService(map);

        service.getDetails({
          placeId: placeId
        }, function(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            
	showPlaceDetails(place, 0);
	
          }//if
        });
      
	
}

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
        icon: photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100})
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name + " : " + place.website);
        infowindow.open(map, this);
    });
	

     //Create an OverlayView, and set it to add the "markerLayer" class to the markerLayer DIV
	 //So we can style the map icons with CSS
     var myoverlay = new google.maps.OverlayView();
     myoverlay.draw = function () {
         this.getPanes().markerLayer.id='markerLayer';
     };
     myoverlay.setMap(map);


	 
}//function createMarker











function listPlaces_less(placeObject){
	
	document.getElementById("listPlaces_less").innerHTML += 'asd'+
	
	'<li>'+
						'<time datetime="2014-07-20 2000">'+
							'<span class="day">4.7</span>'+
							'<span class="month">500 m</span>'+
							'<span class="year">****</span>'+
							'<span class="time">8:00 PM</span>'+
						'</time>'+
						'<div class="info">'+
							'<h2 class="title">Mouse0270s 24th Birthday!</h2>'+
							'<p class="desc">Bar Hopping in Erie, Pa.</p>'+
							'<ul>'+
								'<li style="width:33%;">1 <span class="glyphicon glyphicon-ok"></span></li>'+
								'<li style="width:34%;">3 <span class="fa fa-question"></span></li>'+
								'<li style="width:33%;">103 <span class="fa fa-envelope"></span></li>'+
							'</ul>'
						'</div>'+
					'</li>'+
					
					
	'';

}

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

function showPlaceDetails(placeObject, index){
	var placeList = document.getElementById('placeDetailsBody');
	document.getElementById('placeDetailsHeaderText').innerHTML = placeObject.name;
	//placeList.innerHTML='asd'+'<br/>'+'asd';
	placeList.innerHTML = ' ';
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
	'</div class="panel-group">';
	


}

