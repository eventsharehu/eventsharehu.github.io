console.log('settings-init loaded, it must be load only the full pageload');

//initialize my current location
//if the geolocation doesn't working, it's value stays 0
var myPos = {lat: 0, lng: 0};
var myLocation = myPos;

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


	
    var paris = {lat: 47.5133138, lng: 19.0565847}; //paris: {lat: 48.8704907, lng: 2.3309359};  
	var radius = 1500;
	var keywords_array = [];
	var keywords = ""; //"(söröző) OR (Burger*)",
	var placeTypes = ["restaurant"]; //["bar"]
		
	var icon_prefix = 'https://maps.gstatic.com/mapfiles/place_api/icons/'; //bar-71.png 	
	var placeTypes_all= [
["restaurant", "Étterem", icon_prefix+"restaurant"+"-71.png"],	
["accounting", "Számvitel", icon_prefix+"accounting"+"-71.png"], //nincs ikonja
["airport", "Repülőtér", icon_prefix+"airport"+"-71.png"],
["amusement_park", "Vidámpark", icon_prefix+"amusement"+"-71.png"],
["aquarium", "aquarium", icon_prefix+"aquarium"+"-71.png"],
["art_gallery", "art_gallery", icon_prefix+"art_gallery"+"-71.png"],
["atm", "atm", icon_prefix+"atm"+"-71.png"],
["bakery", "bakery", icon_prefix+"bakery"+"-71.png"],
["bank", "bank", icon_prefix+"bank"+"_dollar-71.png"],
["bar", "bar", icon_prefix+"bar"+"-71.png"],
["beauty_salon", "beauty_salon", icon_prefix+"barber"+"-71.png"],
["bicycle_store", "bicycle_store", icon_prefix+"bicycle"+"-71.png"],
["book_store", "book_store", icon_prefix+"shopping"+"-71.png"],
["bowling_alley", "bowling_alley", icon_prefix+"bowling"+"-71.png"],
["bus_station", "bus_station", icon_prefix+"bus"+"-71.png"],
["cafe", "cafe", icon_prefix+"cafe"+"-71.png"],
["campground", "campground", icon_prefix+"camping"+"-71.png"],
["car_dealer", "car_dealer", icon_prefix+"car_dealer"+"-71.png"],
["car_rental", "car_rental", icon_prefix+"car_rental"+"-71.png"],
["car_repair", "car_repair", icon_prefix+"car_repair"+"-71.png"],
["car_wash", "car_wash", icon_prefix+"car_dealer"+"-71.png"],
["casino", "casino", icon_prefix+"casino"+"-71.png"],
["cemetery", "cemetery", icon_prefix+"worship_christian"+"-71.png"],
["church", "church", icon_prefix+"worship_general"+"-71.png"],
["city_hall", "city_hall", icon_prefix+"civic_building"+"-71.png"],
["clothing_store", "clothing_store", icon_prefix+"shopping"+"-71.png"],
["convenience_store", "convenience_store", icon_prefix+"convenience"+"-71.png"],
["courthouse", "courthouse", icon_prefix+"courthouse"+"-71.png"],
["dentist", "dentist", icon_prefix+"dentist"+"-71.png"],
["department_store", "supermarket", icon_prefix+"department_store"+"-71.png"],
["doctor", "doctor", icon_prefix+"doctor"+"-71.png"],
["electrician", "electrician", icon_prefix+"electronics"+"-71.png"],
["electronics_store", "electronics_store", icon_prefix+"electronics"+"-71.png"],
["embassy", "embassy", icon_prefix+"government"+"-71.png"],
["fire_station", "fire_station", icon_prefix+"geocode"+"-71.png"],
["florist", "florist", icon_prefix+"flower"+"-71.png"],
["funeral_home", "funeral_home", icon_prefix+"worship_christian"+"-71.png"],
["furniture_store", "furniture_store", icon_prefix+"shopping"+"-71.png"],
["gas_station", "gas_station", icon_prefix+"gas_station"+"-71.png"],
["gym", "gym", icon_prefix+"fitness"+"-71.png"],
["hair_care", "hair_care", icon_prefix+"barber"+"-71.png"],
["hardware_store", "hardware_store", icon_prefix+"shopping"+"-71.png"],
["hindu_temple", "hindu_temple", icon_prefix+"worship_hindu"+"-71.png"],
["home_goods_store", "home_goods_store", icon_prefix+"shopping"+"-71.png"],
["hospital", "hospital", icon_prefix+"doctor"+"-71.png"],
["insurance_agency", "insurance_agency", icon_prefix+"geocode"+"-71.png"],
["jewelry_store", "jewelry_store", icon_prefix+"jewelry"+"-71.png"],
["laundry", "Mosoda", icon_prefix+"geocode"+"-71.png"],
["lawyer", "lawyer", icon_prefix+"lawyer"+"-71.png"],
["library", "library", icon_prefix+"library"+"-71.png"],
["liquor_store", "liquor_store", icon_prefix+"liquor_store"+"-71.png"],
["local_government_office", "local_government_office", icon_prefix+"local_government_office"+"-71.png"],
["locksmith", "locksmith", icon_prefix+"locksmith"+"-71.png"],
["lodging", "lodging", icon_prefix+"lodging"+"-71.png"],
["meal_delivery", "meal_delivery", icon_prefix+"meal_delivery"+"-71.png"],
["meal_takeaway", "meal_takeaway", icon_prefix+"meal_takeaway"+"-71.png"],
["mosque", "mosque", icon_prefix+"mosque"+"-71.png"],
["movie_rental", "movie_rental", icon_prefix+"movie_rental"+"-71.png"],
["movie_theater", "movie_theater", icon_prefix+"movie_theater"+"-71.png"],
["moving_company", "moving_company", icon_prefix+"moving_company"+"-71.png"],
["museum", "museum", icon_prefix+"museum"+"-71.png"],
["night_club", "night_club", icon_prefix+"night_club"+"-71.png"],
["painter", "painter", icon_prefix+"painter"+"-71.png"],
["park", "park", icon_prefix+"park"+"-71.png"],
["parking", "parking", icon_prefix+"parking"+"-71.png"],
["pet_store", "pet_store", icon_prefix+"pet_store"+".png"],
["pharmacy", "pharmacy", icon_prefix+"pharmacy"+"-71.png"],
["physiotherapist", "physiotherapist", icon_prefix+"physiotherapist"+"-71.png"],
["plumber", "plumber", icon_prefix+"plumber"+"-71.png"],
["police", "police", icon_prefix+"police"+"-71.png"],
["post_office", "post_office", icon_prefix+"post_office"+"-71.png"],
["real_estate_agency", "real_estate_agency", icon_prefix+"real_estate_agency"+"-71.png"],
["roofing_contractor", "roofing_contractor", icon_prefix+"roofing_contractor"+"-71.png"],
["rv_park", "rv_park", icon_prefix+"rv_park"+"-71.png"],
["school", "school", icon_prefix+"school"+"-71.png"],
["shoe_store", "shoe_store", icon_prefix+"shoe_store"+"-71.png"],
["shopping_mall", "shopping_mall", icon_prefix+"shopping_mall"+"-71.png"],
["spa", "spa", icon_prefix+"spa"+"-71.png"],
["stadium", "stadium", icon_prefix+"stadium"+"-71.png"],
["storage", "storage", icon_prefix+"storage"+"-71.png"],
["store", "store", icon_prefix+"store"+"-71.png"],
["subway_station", "subway_station", icon_prefix+"subway_station"+"-71.png"],
["synagogue", "synagogue", icon_prefix+"synagogue"+"-71.png"],
["taxi_stand", "taxi_stand", icon_prefix+"taxi_stand"+"-71.png"],
["train_station", "train_station", icon_prefix+"train_station"+"-71.png"],
["transit_station", "transit_station", icon_prefix+"transit_station"+"-71.png"],
["travel_agency", "travel_agency", icon_prefix+"travel_agency"+"-71.png"],
["university", "university", icon_prefix+"university"+"-71.png"],
["veterinary_care", "veterinary_care", icon_prefix+"veterinary_care"+"-71.png"],
["zoo", "zoo", icon_prefix+"zoo"+"-71.png"]
];


  












