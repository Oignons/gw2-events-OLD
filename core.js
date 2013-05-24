// Global
var gw2map;

$(function(){

	// Display the list of servers :
	$.getJSON('https://api.guildwars2.com/v1/world_names.json', function(data) {
			var i = 0;

			// Clear the select
			$('#servers_list').find('option').remove('');

			$(data).each(function(){
				$('#servers_list').append('<option value='+data[i]['id']+'>'+data[i]['name']+'</option>')
				i++;
			});
	});

	//Display the map
	gw2map = new Map();
	gw2map.initMap();
});

function load_events() {
	// Display events 
	get_gw2_events($('#servers_list').find(':selected').val(), function(events_list) {
		var results_html = "";
		console.log(events_list);
		for(var i=0; i<events_list.length; i++) {
			results_html += '<br/>'+events_list[i][1]+' : On '+events_list[i][2]+' : '+events_list[i][0];
		}

		// Display on the screen
		gw2map.showEvents(events_list);
	});
}