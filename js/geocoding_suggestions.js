// fetch('api.php', {
//         method: 'GET', // or 'PUT'
//         cors: 'no-cors',
//         headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*'
//         }
//     })
//     .then((response) => {
//         return response.json();
//     })
//     .then((myJson) => {
//         console.log(myJson);
//     });

var AUTOCOMPLETION_URL = 'https://autocomplete.geocoder.api.here.com/6.2/suggest.json',
    // initialize communication with the HERE platform
    APPLICATION_ID   = 'A0dzpR3YpM6wsLQ2DOgf',
    APPLICATION_CODE = 'HpTyvQsI5I4TwgmYvERHXQ',
    ajaxRequest = new XMLHttpRequest(),
    query = '';

/**
 * If the text in the text box has changed, and is not empty,
 * send a geocoding auto-completion request to the server.
 * 
 * @param {object} textBox 
 *  The textBox DOM object linked to this event.
 * @param {object} event 
 *  The DOM event which fired this listener.
 */
function removeHide() {
	
	let divSuggestions = document.getElementsByClassName('panel-heading');
	for (let index = 0; index < divSuggestions.length; index++) {
		const element = divSuggestions[index];
		element.classList.remove('hide');
		
	}
	let ulSuggestions = document.getElementsByClassName('list-group');
	for (let index = 0; index < divSuggestions.length; index++) {
		const element = ulSuggestions[index];

		
	}
}

function autoCompleteListener(textBox, event) {
	if (query != textBox.value) {
		if (textBox.value.length >= 1) {
			/**
			 * HERE Geocoder Autocompletion API documentation
			 * @see https://developer.here.com/documentation/geocoder-autocomplete/topics/resource-suggest.html
			 */
			var params = '?' +
				'query=' + encodeURIComponent(textBox.value) +
				'&beginHighlight=' + encodeURIComponent('<mark>') +
				'&endHighlight=' + encodeURIComponent('</mark>') +
				'&country=FRA' +
				'&app_id=' + APPLICATION_ID +
				'&app_code=' + APPLICATION_CODE
			;

			ajaxRequest.open('GET', AUTOCOMPLETION_URL + params);
			ajaxRequest.send();
		} else {
			clearOldSuggestions();
		}
	}
	query = textBox.value;
}

/**
 * This is the vent listener which processes the XMLHttpRequest response 
 * returned from the server.
 */
function onAutoCompleteSuccess() {
	clearOldSuggestions();
  	// In this context, 'this' means the XMLHttpRequest itself.
  	addSuggestionsToPanel(this.response);
}

/**
 * Called if a communication error occurs during the XMLHttpRequest
 */
function onAutoCompleteFailed() {
  console.log('Ooops!');
}

// Attach the event listeners to the XMLHttpRequest object.
ajaxRequest.addEventListener('load', onAutoCompleteSuccess);
ajaxRequest.addEventListener('error', onAutoCompleteFailed);
ajaxRequest.responseType = 'json';

/**
 * Clear old suggestions within list
 */
function clearOldSuggestions(){
	const el = document.querySelector('.list-group');
    while (el.firstChild) el.removeChild(el.firstChild);
}

/**
 * Format the geocoding autocompletion response object's data for display
 * 
 * @param {object} response 
 */
function addSuggestionsToPanel(response) {   
	$.map(response.suggestions, function (suggestion) {


						       // replace style class used for highlight
		var city     = suggestion.address.state,
			postalCode = suggestion.address.postalCode,
			locationId = suggestion.locationId,

			department = suggestion.address.country,
			region 	   = suggestion.address.state,
			district   = suggestion.address.district,
			county   = suggestion.address.county,
			street     = suggestion.address.street;
			ville     = suggestion.address.city;

		// could be missing
		var districtHTML = '';
		if (district) {
			districtHTML = district.replace(/(<mark>|<\/mark>)/gm, '');
		} 	

		// could be missing
		var streetHTML= '';
		if (street) {
			streetHTML = street.replace(/(<mark>|<\/mark>)/gm, '');

			if (district) {
				streetHTML += ', ';
			}
		}
		let codepost =""
		if(postalCode !== undefined )
		{
			 codepost = ' (' + postalCode + ')';
		}
		else{ codepost =""}
		if (ville !== undefined) {
			
			// create suggestion 
			var button = '<button' +
							' class="list-group-item list-group-item-action"' +
							' data-location="' + locationId + '"' +
							' onclick="getPosition.call(this, event)">' + 
							'<h5 class="list-group-item-heading">' + ville + codepost + '</h5>' +
							'<h6 class="list-group-item-text">' + streetHTML + districtHTML + '</h6>' +
							'<p class="list-group-item-text">' + department + ', ' + city + ', ' + county + '</p>' +
						 '</button>'
			;
			// attach that suggestion to existing list wrapper (see index.html)
			document.querySelector('.list-group').innerHTML += button;
		}

		


	});



}

