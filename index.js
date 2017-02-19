'use strict';
var request = require('request');
var parser = require('xml2json');
var Q = require('q');

module.exports = function (relayAddress) {
	var module = {};

	module.status = function (callback) {
		var deferred = Q.defer();
		request.get(relayAddress + '/stateFull.xml', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var json = JSON.parse(parser.toJson(body));
				var relayResponse = json.datavalues
				deferred.resolve(relayResponse);
			} else {
				deferred.reject('error with getting relay status!');
			}
		});
		deferred.promise.nodeify(callback);
		return deferred.promise;
	};

	module.close = function (callback) {
		var deferred = Q.defer();
		request.get(relayAddress + '/stateFull.xml?relayState=1', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var json = JSON.parse(parser.toJson(body));
				var relayResponse = json.datavalues
				deferred.resolve(relayResponse);
			} else {
				deferred.reject('error with setting relay to 1!');
			}
		});
		deferred.promise.nodeify(callback);
		return deferred.promise;
	};

	module.open = function (callback) {
		var deferred = Q.defer();
		request.get(relayAddress + '/stateFull.xml?relayState=0', function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var json = JSON.parse(parser.toJson(body));
				var relayResponse = json.datavalues
				deferred.resolve(relayResponse);
			} else {
				deferred.reject('error with setting relay to 0!');
			}
		});
		deferred.promise.nodeify(callback);
		return deferred.promise;
	};

	return module;
};
