var http = require('http'),
		url = require('url'),
		fs = require('fs'),
		io = require('../../../deps/socket.io'),
		sys = require('sys')
		arduinoProvider = require('../../../deps/node-arduino/lib/provider/serial'),
		arduino = require('../../../deps/node-arduino/lib/arduino'),
		board = arduino.connect('/dev/cu.usbserial-A9007OGm')
	;

server = http.createServer();
server.listen(8080);

var io = io.listen(server),
	buffer = []
;

io.on('connection', function(client){
	client.send({ buffer: buffer });
	client.broadcast({ announcement: client.sessionId + ' connected' });

	client.on('message', function(message){
		console.log(message);
		var msg = { message: [client.sessionId, message] };
		handleMessage(message);
		buffer.push(msg);
		if (buffer.length > 15) buffer.shift();
		client.broadcast(msg);
	});

	client.on('disconnect', function(){
		client.broadcast({ announcement: client.sessionId + ' disconnected' });
	});
});

const OPC_PIN_MODE         = 0x01;
const OPC_DIGITAL_READ     = 0x02;
const OPC_DIGITAL_WRITE    = 0x03;
const OPC_ANALOG_REFERENCE = 0x04;
const OPC_ANALOG_READ      = 0x05;
const OPC_ANALOG_WRITE     = 0x06;

function handleMessage(msg){
	if (!msg || !msg.control || !msg.control.length){
		return;
	}

	switch (msg.control[0]){
		case OPC_PIN_MODE:
			board.pinMode(msg.control[1], msg.control[2]);
			break;
		case OPC_DIGITAL_READ:
			board.digitalRead(msg.control[1]);
			break;
		case OPC_DIGITAL_WRITE:
			board.digitalWrite(msg.control[1], msg.control[2]);
			break;
		case OPC_ANALOG_REFERENCE:
			board.analogReference(msg.control[1]);
			break;
		case OPC_ANALOG_READ:
			board.analogRead(msg.control[1]);
			break;
		case OPC_ANALOG_WRITE:
			board.analogWrite(msg.control[1], msg.control[2]);
			break;

	}
}