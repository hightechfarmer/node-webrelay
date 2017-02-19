'use strict';
var request = require('request');
var parser = require('xml2json');

module.exports = function (relayAddress) {
	var module = {};

	module.status = function (callback) {
		request.get(relayAddress + '/stateFull.xml', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var json = JSON.parse(parser.toJson(body));
				var relayResponse = json.datavalues
				callback(relayResponse);
			} else {
				callback('error!');
			}
		});
	};

	module.close = function (callback) {
		request.get(relayAddress + '/stateFull.xml?relayState=1', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var json = JSON.parse(parser.toJson(body));
				var relayResponse = {
					relayState: json.datavalues.relaystate
				};
				callback(relayResponse);
			} else {
				callback('error!');
			}
		});
	};

	module.open = function (callback) {
		request.get(relayAddress + '/stateFull.xml?relayState=0', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var json = JSON.parse(parser.toJson(body));
				var relayResponse = {
					relayState: json.datavalues.relaystate
				};
				callback(relayResponse);
			} else {
				callback('error!');
			}
		});
	};

	return module;
};
