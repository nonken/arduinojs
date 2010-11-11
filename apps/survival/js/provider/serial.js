/*
 *  node-arduino: Control your Arduino with Node
 *
 *  Copyright (c) 2010 Tobias Schneider, Nikolai Onken
 *  node-arduino is freely distributable under the terms of the MIT license.
 */

var sys = require('sys'),
	SerialPort = require('../../deps/node-serialport/serialport_native/build/default/serialport_native').SerialPort
;

const SERIAL_BAUDRATE = 9600;

Provider = function(){
	this.sp = new SerialPort;
	this.path = '/dev/cu.usbserial-A9007OGm';
};

Provider.prototype.open = function(){
	this.sp.open(this.path, SERIAL_BAUDRATE);
};

Provider.prototype.write = function(){
	this.sp.write.apply(this.sp, arguments);
}

Provider.prototype.on = function(){
	if (arguments[0] == 'data'){
		this.sp.on('data', arguments[1]);
	}
};