/*
 *  node-arduino: Control your Arduino with Node
 *
 *  Copyright (c) 2010 Tobias Schneider, Nikolai Onken
 *  node-arduino is freely distributable under the terms of the MIT license.
 */

Provider = function(){
	this.sp = new io.Socket(null, {port: 8080});
	this.sp.connect();
};

Provider.prototype.open = function(){
	this.sp.connect();
};

Provider.prototype.write = function(){
	this.sp.send({ 'control': arguments[0] });
}

Provider.prototype.on = function(){
	if (arguments[0] == 'data'){
		this.sp.on('message', arguments[1]);
	}
};

Buffer = function(){
	return arguments[0];
}

arduino = exports = {};