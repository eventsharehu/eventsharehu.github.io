
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

modified version of that:
https://jsfiddle.net/2aeuyy6e/1/
*/


	var markershtml = [ 
							{ Lat:"40.78142", Lng:"-73.96655", name:"CENTRAL PARK", img: "https://lh3.googleusercontent.com/p/AF1QipPrufw2qU3Cl3TraWziqlfIV19fJDEe2evLKYDv=w500-h500-k" },
							{ Lat:"40.78", Lng:"-73.96", name:"Custom", img:"https://lh3.googleusercontent.com/p/AF1QipMgVC5xeZGKgSfe7GN4J3E9n29Gk9d6Yp6fPQqX=w500-h500-k" }
					  ];


function customMarker(latlng, map, args)
	{
		this.latlng = latlng;
		this.args = args;
		this.setMap(map);
	}
	
	customMarker.prototype = new google.maps.OverlayView();
	
	customMarker.prototype.draw = function() 
	{
		var self = this;
		var div = this.div;
	
		if (!div) 
		{
		
		div = this.div = document.createElement('div');
		div.id = 'marker';
		div.style.width = '100px';
		div.style.height = '100px';;
		
		var div_pointer = document.createElement('div');
		div_pointer.className = 'triangle';
		
		var image_container = document.createElement('div');
		image_container.className = 'image_container';
		
		var img = document.createElement('img');
		img.className = "marker_image";
		img.src = self.args.img;
		
		var name_container = document.createElement('div');
		name_container.className = 'name_container';
		
		var text = document.createElement('p');
		text.innerText = self.args.name;
		text.className = 'text';
		
		var exit = document.createElement('div');
		exit.className = 'exit';
		exit.innerHTML = '<img className="exit_image" style="width:30px; height:30px;" src="https://cdn3.iconfinder.com/data/icons/security-1/512/delete-512.png">' + '</img>';
        exit.style.display = 'none';
		
		
		function large()
		{
			div.classList.add('large');
			div.style.width = '300px'; 
			div.style.height = '300px';
			div.style.zIndex = '1000';

			exit.style.display = 'block';
			exit.style.opacity = '1';
			exit.addEventListener('mouseover', function()
			{
				exit.style.opacity = '1';
			}, false);
			exit.addEventListener('mouseout', function()
			{
				exit.style.opacity = '0.3';
			}, false);
			
		}
		
		function close(e)
		{
				var target = e.target;
				e.stopPropagation();
				div.classList.remove('large');
				div.style.width = '100px';
				div.style.height = '100px';
				
				exit.style.display = 'none';
		}
		
		div.appendChild(image_container);
		image_container.appendChild(img);
		div.appendChild(div_pointer);
		div.appendChild(name_container);
		name_container.appendChild(text);
		div.appendChild(exit);
		
		name_container.onmouseover = function(){ name_container.style.opacity = '0.6'; div.style.zIndex = '1000' };
		name_container.onmouseout = function(){ name_container.style.opacity = '0'; div.style.zIndex = '100' };
		div.addEventListener('click', large, false);
		exit.addEventListener('click', close, false);
		
			if(typeof(self.args.marker_id) !== 'undefined') 
			{
				div.dataset.marker_id = self.args.marker_id; 
			}
		
			google.maps.event.addDomListener(div, "click", function(event) 
			{ 
				google.maps.event.trigger(self, "click");
			});
		
		var panes = this.getPanes();
		
		panes.overlayImage.appendChild(div);
		
		}
	
		var point = this.getProjection().fromLatLngToDivPixel(this.latlng);
	
		if (point) 
		{
		div.style.left = (point.x - 50) + 'px';
		div.style.top = (point.y - 125) + 'px';
		}
	}
	
	customMarker.prototype.remove = function() 
	{
	this.setMap(null);
		
		if (this.div) 
		{
			this.div.parentNode.removeChild(this.div);
			this.div = null;
			
		}
		
	}
	
	customMarker.prototype.getPosition = function() 
	{	
		return this.latlng;
	}
	



	function markershtmlCreate(){
	markershtml.forEach(function(marker)
	{
		var newLatlng = new google.maps.LatLng( marker.Lat, marker.Lng );
		image = marker.img;
		name = marker.name;
	
		var overlay = new customMarker(
		newLatlng, 
		map,
		{
			img: image,
			name: name,
			marker_id: '123',
			colour: 'Red'
		});
	});
	}//function asdqwe


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
		markershtml	= [];
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
  
			console.log(results[i]);
			try{
				photoreference=results[i].photos[0].getUrl({'maxWidth': 500, 'maxHeight': 500});
			}catch(err) { photoreference='https://cdn.browshot.com/static/images/not-found.png'; }

		orientation = get_orientation(photoreference);


//Adding the datas to the markershtml array
markershtml.push( { Lat: lat, Lng: lng, name: name, img: photoreference  });	
	
	
		
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
After the for loop place the html markers
*/	

markershtmlCreate();

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

