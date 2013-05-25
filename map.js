$(function(){

Map = function() {
	console.log('Map object.');
	this.map;
}

// Create and show the map
Map.prototype.initMap = function() {
	this.map = new L.map('map', {
		center: new L.latLng(10, 10),
		zoom: 4,
		maxZoom: 7,
		minZoom: 3
	});
	var tilesUrl = 'tiles/{z}_{x}_{y}.jpg';
	var layer = new L.tileLayer(tilesUrl, {
		maxZoom: 7
	});

	return this.map.addLayer(layer);
};

// Show events on the map
Map.prototype.showEvents = function(events) {

	var rect, area, dim;
	// Style
	var rect_style = {
		color: "grey",
		fill: true,
		fillOpacity: 0.2
	}
	// Map
	var map = this.map;
	$.getJSON('areas.json', function(data){
		$(data).each(function(iter) {
			// data[iter] : area
			area = data[iter];
			// Dimension
			dim = new L.latLngBounds(L.latLng(area['swLat'], area['swLng']), L.latLng(area['neLat'], area['neLng']));
			// Add each area with a rectangle
			rect = new L.rectangle(dim, rect_style);
			// Add some cool stuff here
			var marker = L.marker(dim.getCenter()).addTo(map);
			marker.on('click', function(e) {
				// Show events : marker.bindPopup('Hello !').openPopup();
				// data[iter]['id'] and events[it][3] for the IDs
				event_on_map_html = ''; // Html to show
				$(events).each(function(it) {
					// If the event is on the map
					if (events[it][3] ==  data[iter]['id']) { // Check if the event is on the map
						// Check if the event is active and the option is checked
						if(events[it][1] == 'Active' && $('#active_events').is(':checked')) {
							event_on_map_html += '<span class=\'event_active\'>'+events[it][0]+'</span><br/>';
						}
						// Same for warmup
						else if(events[it][1] == 'Warmup' && $('#warmup_events').is(':checked')) {
							event_on_map_html += '<span class=\'event_warmup\'>'+events[it][0]+'</span><br/>';
						}
						// Same for success, fail & preparation
						else if(events[it][1] == 'Success' && $('#succeeded_events').is(':checked')) {
							event_on_map_html += '<span class=\'event_success\'>'+events[it][0]+'</span><br/>';
						}
						else if(events[it][1] == 'Fail' && $('#failed_events').is(':checked')) {
							event_on_map_html += '<span class=\'event_fail\'>'+events[it][0]+'</span><br/>';
						}
						else if(events[it][1] == 'Preparation' && $('#preparation_events').is(':checked')) {
							event_on_map_html += '<span class=\'event_preparation\'>'+events[it][0]+'</span><br/>';
						}
					}
				});
				marker.bindPopup(event_on_map_html).openPopup();
			});
			// Add the rectangle to the map
			rect.addTo(map);
		});
	});
	
}

});