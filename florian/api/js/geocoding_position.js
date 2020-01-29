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
			document.querySelector('#location').innerHTML = displayText;
		
			
	/* la carte s'affiche avec les coordonées */
	

	let body = document.getElementById('body');
	let laCarte = document.getElementById('macarte');
	body.removeChild(laCarte);

	let newCarte = document.createElement('div');
	newCarte.setAttribute('id', 'macarte');

	body.appendChild(newCarte);

	var carte = L.map('macarte').setView([latitude, longitude], 13);

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(carte);
		

/* api carbu */

	fetch('apiCarbu.php', {
        method: 'GET', // or 'PUT'
        cors: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then((responseCarbu) => {
        return responseCarbu.json();
    })
    .then((myJsonCarbu) => {
		let myNewJsonCarbu = JSON.parse(myJsonCarbu);
	
		let baseCarbu = myNewJsonCarbu['records'];
		
		for (let index = 0; index < baseCarbu.length; index++) {
			const element = baseCarbu[index]['fields'];
			
			let poseCarbu = element["geo_point"];
			if (poseCarbu !== undefined && poseCarbu !== null) {

				if (poseCarbu[0] >= Math.floor(latitude) && poseCarbu[1] >= Math.floor(longitude) && poseCarbu[0] <= Math.ceil(latitude) && poseCarbu[1] <= Math.ceil(longitude)) {
					
					var marker = L.marker([poseCarbu[0], poseCarbu[1]]).addTo(carte);
	
					marker.bindPopup(''); // Je ne met pas de texte par défaut
					var mapopup = marker.getPopup();
					let gplc = "";
					let e10 = "";
					let gazole = "";
					let sp95 = "";
					let sp98 = "";
		
					if (element['price_gplc'] !== undefined && element['price_gplc'] !== null) {
						gplc = "<br> GPLC = "+ element['price_gplc'] + " €";
					}
					if (element['price_e10'] !== undefined && element['price_e10'] !== null) {
						e10 = "<br> E10 = "+ element['price_e10'] + " €";
					}
					if (element['price_gazole'] !== undefined && element['price_gazole'] !== null) {
						gazole = "<br> GAZOLE = "+ element['price_gazole'] + " €";
					}
					if (element['price_sp95'] !== undefined && element['price_sp95'] !== null) {
						sp95 = "<br> SP95 = "+ element['price_sp95'] + " €";
					}
					if (element['price_sp98'] !== undefined && element['price_sp98'] !== null) {
						sp98 = "<br> SP98 = "+ element['price_sp98'] + " €";
					}
					
					
					
					mapopup.setContent(element['name'] + gplc + e10 + gazole + sp95 + sp98);

				}
				
			}
			
			

		}

		let lesMarkersCarbu = document.getElementsByClassName('leaflet-marker-icon');

			for (let i = 0; i < lesMarkersCarbu.length; i++) {
				
				const elementImg = lesMarkersCarbu[i];
				
				elementImg.classList.add("carbu");
				

			}


});


/* api gare */

fetch('apiGare.php', {
	method: 'GET', // or 'PUT'
	cors: 'no-cors',
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*'
	}
})
.then((responseGare) => {
	return responseGare.json();
})
.then((myJsonGare) => {
	let myNewJsonGare = JSON.parse(myJsonGare);

	/* base qui va permettre de créer des variable qui vont récupérer les infos plus précise */
	let baseGare = myNewJsonGare['records'];
	
	/* boucle sur tout les éléments */
	for (let index = 0; index < baseGare.length; index++) {
		const element = baseGare[index]['fields'];
		
		/* position des éléments */
		let poseGare = element["c_geo"];
		if (poseGare !== undefined && poseGare !== null) {
			/* vérifie si la position est vers la zone recherché */
			if (poseGare[0] >= Math.floor(latitude) && poseGare[1] >= Math.floor(longitude) && poseGare[0] <= Math.ceil(latitude) && poseGare[1] <= Math.ceil(longitude)) {
				
				/* créer le marker */
				var marker = L.marker([poseGare[0], poseGare[1]]).addTo(carte);

				/* créer l'infobull */
				marker.bindPopup(''); // Je ne met pas de texte par défaut
				var mapopup = marker.getPopup();

				/* var du contenu de l'infobull */
				let libelle = "";
	
				if (element['libelle'] !== undefined && element['libelle'] !== null) {
					libelle = element['libelle'];
				}
	
				/* contenue de l'infobull */
				mapopup.setContent("Gare : <br>"+libelle);

			}
			
		}
		
		

	}
	/* ajout d'une class pour définir un marker */
	let lesMarkersCarbu = document.getElementsByClassName('leaflet-marker-icon');

		for (let i = 0; i < lesMarkersCarbu.length; i++) {
			
			const elementImg = lesMarkersCarbu[i];

				
				elementImg.classList.add("gare");


		}


});

	
}
	});
}