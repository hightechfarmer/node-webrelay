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
- Get relay status
```
webRelay.status(function (data) {
	console.log('data', data);
});
```
- Close relay (on)
```
webRelay.close(function (data) {
	console.log('data', data);
});
```
- Open relay (off)
```
webRelay.open(function (data) {
	console.log('data', data);
});
```
