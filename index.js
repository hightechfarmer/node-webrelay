'use strict';
const axios = require('axios')

function WebRelay (address) {
  let request

  if (!address || typeof address !== 'string') {
    throw {
      err: '[WebRelay]: Address cannot be blank or a non-string value.'
    }
  } else {
    request = axios.create({
      baseURL: address
    })
  }

  const API = {
    status () {
      // TODO: implement
      return new Promise((resolve, reject) => {
        request.get('/stateFull.xml').then(res => {
          if (res.data) {
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    open () {
      return new Promise((resolve, reject) => {
        request.get('/state.xml?relayState=0').then(res => {
          if (res.status === 200) {
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    close () {
      return new Promise((resolve, reject) => {
        request.get('/state.xml?relayState=1').then(res => {
          if (res.status === 200) {
            resolve()
          } else {
            reject()
          }
        })
      })
    }
  }

  return API
}

exports.webRelay = WebRelay
