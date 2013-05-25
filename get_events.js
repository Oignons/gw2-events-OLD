var url_world_names = 'https://api.guildwars2.com/v1/world_names.json';
var url_map_names = 'https://api.guildwars2.com/v1/map_names.json';
var url_event_names = 'https://api.guildwars2.com/v1/event_names.json';
var url_events = 'https://api.guildwars2.com/v1/events.json';

// Globals
var servers = []; //id, name
var maps = []; //id, name
var events = []; //id, name

// Return infos
function get_gw2_infos(url, global_var, callback) {
	$.getJSON(url, function(data) {

		$(data).each(function(iterator) {
			global_var.push(data[iterator]);
		});

		callback();
	});
}

// Return events for a given world
function get_gw2_events(world_id, callback) {
	get_gw2_infos(url_world_names, servers, function() {
		get_gw2_infos(url_event_names, events, function() {
			get_gw2_infos(url_map_names, maps, function() {

				var request = url_events + '?world_id=' + world_id;
				var events_on_world = [];

				$.getJSON(request, function(data) {

				$(data['events']).each(function(i){
					map_name = get_matching_name(data['events'][i]['map_id'], maps);
					map_id = data['events'][i]['map_id'];
					event_name = get_matching_name(data['events'][i]['event_id'], events);
					event_status = data['events'][i]['state'];

					events_on_world.push( [event_name, event_status, map_name, map_id] );
					i++;
				});
							
				// Finally return the events
				callback(events_on_world);

				});

			})
		})
	});
}

// Get the name for the given id
function get_matching_name(id, array) {
	for(var it=0; it<array.length; it++) {
		if (array[it]['id'] == id) return array[it]['name'];
	}
	return 'unknown'; //Never happens
}