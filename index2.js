'use strict';
const curl = require('curl')

function WebRelay (address) {
  if (!address || typeof address !== 'string') {
    throw {
      err: '[WebRelay]: Address cannot be blank or a non-string value.'
    }
  }

  const API = {
    status () {
      // TODO: implement
      return new Promise((resolve, reject) => {
        curl.get(address + '/stateFull.xml', (err, res, body) => {
          if (err) {
            reject()
          } else {
            console.log(res)
            resolve()
          }
        })
      })
    },
    open () {
      return new Promise((resolve, reject) => {
        curl.get(address + '/state.xml?relayState=0', (err, res, body) => {
          if (err) {
            reject()
          } else {
            console.log(res)
            resolve()
          }
        })
      })
    },
    close () {
      return new Promise((resolve, reject) => {
        curl.get(address + '/state.xml?relayState=1', (err, res, body) => {
          if (err) {
            reject()
          } else {
            console.log(res)
            resolve()
          }
        })
      })
    }
  }

  return API
}

exports.webRelay = WebRelay
