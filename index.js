'use strict';
const Request = require('request');
const parser  = require('xml2json');

const request = Request.defaults({
  timeout: 5000
})
// Settings for xml2json parser
const PARSER_SETTINGS = {
  object: true,
  sanitize: true
};

// Module
function WebRelay(address) {
  if (!address || typeof address !== 'string') {
    throw '[WebRelay]: Address cannot be blank or a non-string value.';
  }

  const API = {
    // Fetching status from relay
    // @return Promise
    status() {
      return new Promise((resolve, reject) => {
        request.get(address + '/stateFull.xml', function (err, res, body) {
          if (!err && res.statusCode === 200) {
            const jsonRes  = parser.toJson(body, PARSER_SETTINGS);

            if (jsonRes.datavalues) {
              resolve(jsonRes.datavalues);
            } else {
              reject('Could not get .datavalues from response, while getting status.');
            }

          } else {
            reject('Relay returned non-200 status: ' + res.statusCode);
          }
        });
      });
    },

    // Closing the relay
    // @return Promise
    close() {
      return new Promise((resolve, reject) => {
        request.get(address + '/state.xml?relayState=1', function (err, res, body) {
          if (!err && res.statusCode === 200) {
            const jsonRes = parser.toJson(body, PARSER_SETTINGS);

            if (jsonRes.datavalues) {
              resolve(jsonRes.datavalues);
            } else {
              reject('Could not get .datavalues from response, while closing door.');
            }

          } else {
            reject('Error while closing relay: ', res);
          }
        });
      });
    },

    // Opening the relay
    // @return Promise
    open() {
      return new Promise((resolve, reject) => {
        request.get(address + '/state.xml?relayState=0', function (err, res, body) {
          if (!err && res.statusCode === 200) {
            const jsonRes = parser.toJson(body, PARSER_SETTINGS);

            if (jsonRes.datavalues) {
              resolve(jsonRes.datavalues);
            } else {
              reject('Could not get .datavalues from response, while opening door.');
            }

          } else {
            reject('Error while opening relay: ', res);
          }
        });
      });
    }
  };

  return API;
}

exports.webRelay = WebRelay;
