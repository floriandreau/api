var GEOCODER_URL = 'https://geocoder.api.here.com/6.2/geocode.json',
    // initialize communication with the HERE platform
    APPLICATION_ID   = 'A0dzpR3YpM6wsLQ2DOgf',
    APPLICATION_CODE = 'HpTyvQsI5I4TwgmYvERHXQ';

/**
 * Geocoder request to retrieve the Location Details
 * 
 * @see https://developer.here.com/documentation/geocoder-autocomplete/topics/example-location-id.html
 */
function getPosition() {
	// locationId is provided by HERE
	var locationId = $(this).attr('data-location');

	$.ajax({
		url: GEOCODER_URL,
		type: 'GET',
		dataType: 'jsonp',
		jsonp: 'jsoncallback',
		data: {
			locationid: locationId,
			app_id: APPLICATION_ID,
			app_code: APPLICATION_CODE,
			jsonattributes: '1', // lowercase response keys
			gen: '9'
		},
		success: function (data) {
			var location  = data.response.view[0].result[0].location.displayPosition,
				latitude  = location.latitude,
				longitude = location.longitude;

			var displayText = 'Latitude : ' + latitude + ' / Longitude : ' + longitude;
			// document.querySelector('#location').innerHTML = displayText;
		
			
	/* la carte s'affiche avec les coordonées */
	

	let body = document.getElementById('body');
	let laCarte = document.getElementById('macarte');
	body.removeChild(laCarte);

	let newCarte = document.createElement('div');
	newCarte.setAttribute('id', 'macarte');

	body.appendChild(newCarte);

	var carte = L.map('macarte').setView([latitude, longitude], 10);

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.accesscodeschool.fr/">ACS - Belfort</a> contributors'
	}).addTo(carte);
		}
	});
}