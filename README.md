# node-webrelay
Unofficial easy-to-use Promise-wrapped API for the Control by Web WebRelay™. http://www.controlbyweb.com/webrelay/

# Installation
```javascript
const webRelay = require('@kevinbalouch/node-webrelay');
```

# Usage
```javascript
const relay = webRelay('192.168.0.2');

relay.status()
  .then(result => {
    // Getting relay status
  }).catch(err => {
    // Error while getting status
  });
```

# API
All functions are returning Promises.
* *.status()* - Getting relay status
* *.open()* - Opening the relay
* *.close()* - Closing the relay