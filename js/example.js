/**
 * Returns a random natural number between the lower and upper bound (including both bounds).
 * Can alternatively be called with just one parameter, in which case the lower
 * bound will be assumed to be zero.
 *
 * @author Jannes Meyer
 */
function random(lower, upper) {
	if (typeof upper === 'undefined') {
		// Use the first parameter as upper bound and 0 as lower bound
		return Math.floor(Math.random() * (lower + 1));
	} else {
		// We are always rounding down, so we have to extend the upper bound by one
		return Math.floor(Math.random() * (upper + 1 - lower)) + lower;
	}
}
/**
 * Returns a random real number between the lower and upper bound
 * (including the lower bound, but not the upper bound).
 * Can alternatively be called with just one parameter, in which case the lower
 * bound will be assumed to be zero.
 *
 * @author Jannes Meyer
 */
function randomFloat(lower, upper) {
	if (typeof upper === 'undefined') {
		// Use the first parameter as upper bound and 0 as lower bound
		return Math.random() * lower;
	} else {
		return Math.random() * (upper - lower) + lower;
	}
}


// PVector object constructor
PVector = function(x, y) {
	this.x = x;
	this.y = y;
};
// Addition
PVector.prototype.add = function(v) {
	this.x += v.x;
	this.y += v.y;
	// Allow for chaining
	return this;
};
// Subtraction
PVector.prototype.sub = function(v) {
	this.x -= v.x;
	this.y -= v.y;
	return this;
};
// Multiplication
PVector.prototype.mult = function(factor) {
	this.x *= factor;
	this.y *= factor;
	return this;
};
// Division
PVector.prototype.div = function(dividend) {
	this.x /= dividend;
	this.y /= dividend;
	return this;
};
// Calculate the magnitude
PVector.prototype.mag = function() {
	return Math.sqrt(this.x*this.x + this.y*this.y);
};
// Normalization
PVector.prototype.normalize = function() {
	// Inlined function calls for better performance
	var magnitude = Math.sqrt(this.x*this.x + this.y*this.y);
	if (magnitude !== 0) {
		this.x /= magnitude;
		this.y /= magnitude;
	}
	return this;
};
// Check for null vector
PVector.prototype.isNull = function() {
	return this.x === 0 && this.y === 0;
};
// Limit the magnitude of the vector
PVector.prototype.limit = function(max) {
	if (this.mag() > max) {
		this.normalize();
		this.mult(max);
	}
	return this;
};
// I don't need no static methods.
PVector.prototype.clone = function() {
	return new PVector(this.x, this.y);
};



// Mover object constructor
function Mover() {
	this.location = new PVector(random(stage.canvas.width), random(stage.canvas.height));
	this.velocity = new PVector(0, 0);
	this.acceleration = new PVector(0, 0);
	this.topspeed = 5;

	// Create ball
	this.radius = 16;
	this.shape = new createjs.Shape();
	this.shape.graphics
		.beginFill(createjs.Graphics.getRGB(0, 0, 0, 0.25))
		.drawCircle(0, 0, this.radius);
	stage.addChild(this.shape);
}
Mover.prototype.update = function() {
	// Accelerate towards the mouse
	mouse.x = stage.mouseX;
	mouse.y = stage.mouseY;

	if (!mouse.isNull()) {
		mouse.sub(this.location);
		mouse.normalize();
		mouse.mult(0.5);
		this.acceleration = mouse;
	}

	// Velocity changes by acceleration
	this.velocity.add(this.acceleration);
	// And is limited by topseed
	this.velocity.limit(this.topspeed);
	this.location.add(this.velocity);
};
Mover.prototype.display = function() {
	this.shape.x = this.location.x;
	this.shape.y = this.location.y;
};
Mover.prototype.checkEdges = function() {
	if (this.location.x > stage.canvas.width) {
		this.location.x = 0;
	} else if (this.location.x < 0) {
		this.location.x = stage.canvas.width;
	}

	if (this.location.y > stage.canvas.height) {
		this.location.y = 0;
	} else if (this.location.y < 0) {
		this.location.y = stage.canvas.height;
	}
};



var stage;
var movers = [];
var mouse;

window.addEventListener('DOMContentLoaded', init, false);

function init() {
	var canvas = document.getElementById("canvas");
	stage = new createjs.Stage(canvas);

	// Automatically resize the canvas to fullscreen, fuck performance
	function resizeToFullscreen() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	resizeToFullscreen();
	window.addEventListener('resize', resizeToFullscreen, false);

	// Create Mover
	for (var i = 0; i < 20; ++i) {
		movers.push(new Mover());
	}
	// Create a Point that will be used to store the mouse position
	mouse = new PVector(0, 0);
	
	// Start ticker
	createjs.Ticker.addListener(window);
	createjs.Ticker.setFPS(60);
}

function tick() {
	for (var i = 0, len = movers.length; i < len; ++i) {
		movers[i].update();
		movers[i].checkEdges();
		movers[i].display();
	}

	stage.update();
}