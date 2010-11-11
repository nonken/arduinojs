/*
 *  node-arduino: Control your Arduino with Node
 *
 *  Copyright (c) 2010 Tobias Schneider, Nikolai Onken
 *  node-arduino is freely distributable under the terms of the MIT license.
 */

const OPC_PIN_MODE         = 0x01;
const OPC_DIGITAL_READ     = 0x02;
const OPC_DIGITAL_WRITE    = 0x03;
const OPC_ANALOG_REFERENCE = 0x04;
const OPC_ANALOG_READ      = 0x05;
const OPC_ANALOG_WRITE     = 0x06;
const OPC_SOUND            = 0x07;

exports.HIGH = 0x01;
exports.LOW  = 0x00;

exports.INPUT  = 0x00;
exports.OUTPUT = 0x01;

exports['true']  = 0x01;
exports['false'] = 0x00;

exports.EXTERNAL = 0x00;
exports.DEFAULT  = 0x01;
exports.INTERNAL = 0x03;

exports.A = 0x01;
exports.B = 0x02;
exports.C = 0x03;
exports.D = 0x04;
exports.E = 0x05;
exports.F = 0x06;
exports.G = 0x07;

Board = function(path){
	this.p = new Provider;

	this.p.on('data', function(data){
		console.log(data);
	});

	this.p.open();
}

Board.prototype = {
	pinMode: function(pin, mode){
		this.p.write(new Buffer([OPC_PIN_MODE, pin, mode]), 3);
	},

	digitalRead: function(pin){
		// TODO
	},

	digitalWrite: function(pin, val){
		console.log(pin);
		this.p.write(new Buffer([OPC_DIGITAL_WRITE, pin, val]), 3);
	},

	analogReference: function(type){
		this.p.write(new Buffer([OPC_ANALOG_REFERENCE, type]), 2);
	},

	analogRead: function(pin){
		// TODO
	},

	analogWrite: function(pin, val){
		this.p.write(new Buffer([OPC_ANALOG_WRITE, pin, val]), 3);
	},

    sound: function(pin, val){
		this.p.write(new Buffer([OPC_SOUND, pin, val]), 3);
    }
};

exports.connect = function(){
	return new Board();
};
