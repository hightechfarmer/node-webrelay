# node-webrelay
Node module to control these sweet ethernet controlled relays http://www.controlbyweb.com/webrelay/

## installation
```
npm install nkristoffersen/node-webrelay
```

## usage
- Add to your node project and include the local IP address of the web relay.
```
const webRelay = require('@nkristoffersen/node-webrelay')('http://192.168.1.2');
```
- Get relay status. The callback is the status returned from the web relay in JSON format.
```
webRelay.status(function (data) {
	console.log('data', data);
});
```
- Close relay (on). The callback is the state returned from the web relay in JSON format.
```
webRelay.close(function (data) {
	console.log('data', data);
});
```
- Open relay (off). The callback is the state returned from the web relay in JSON format.
```
webRelay.open(function (data) {
	console.log('data', data);
});
```
