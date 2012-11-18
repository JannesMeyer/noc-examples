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
function Mover(m, x, y) {
	this.mass = m;
	this.location = new PVector(x, y);
	this.velocity = new PVector(0, 0);
	this.acceleration = new PVector(0, 0);

	// Create ball
	this.shape = new createjs.Shape();
	this.shape.graphics
		.beginFill(createjs.Graphics.getRGB(0, 0, 0, 0.3))
		.drawCircle(0, 0, this.mass * 16);
	stage.addChild(this.shape);
}
Mover.prototype.applyForce = function(force) {
	this.acceleration.add(force.clone().div(this.mass));
};
Mover.prototype.update = function() {
	// Velocity changes by acceleration
	this.velocity.add(this.acceleration);
	this.location.add(this.velocity);
	// Reset acceleration for the next frame
	this.acceleration.mult(0);
};
Mover.prototype.display = function() {
	this.shape.x = this.location.x;
	this.shape.y = this.location.y;
};
Mover.prototype.checkEdges = function() {
	var canvas = stage.canvas;
	var radius = this.mass * 16;
	var vel = this.velocity;

	if (this.location.x > canvas.width) {
		vel.x *= -1;
		this.location.x = canvas.width;
	} else if (this.location.x < 0) {
		vel.x *= -1;
		this.location.x = 0;
	}

	if (this.location.y + radius > canvas.height) {
		vel.y *= -1;
		this.location.y = canvas.height - radius;
	}
};



var stage;
var movers = [];

window.addEventListener('DOMContentLoaded', init, false);

function init() {
	var canvas = document.getElementById("canvas");
	stage = new createjs.Stage(canvas);

	// Automatically resize the canvas to fullscreen, fuck performance
	function resizeToFullWindow() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}
	resizeToFullWindow();
	window.addEventListener('resize', resizeToFullWindow, false);

	// Create a mover
	for (var i = 0; i < 20; ++i) {
		// movers.push(new Mover(randomFloat(1, 4), 0, 0));
		movers.push(new Mover(randomFloat(1, 4), random(canvas.width), 0));
	}

	// Start ticker
	createjs.Ticker.addListener(window);
	createjs.Ticker.setFPS(60);
}

function tick() {
	// Friction coefficient
	var c = 0.05;
	// Wind force
	var wind = new PVector(0.01, 0);

	for (var i = 0, len = movers.length; i < len; ++i) {
		var mover = movers[i];

		// Calculate friction force, which points in the opposite direction of velocity
		var friction = mover.velocity.clone().mult(-1).normalize().mult(c);
		// Calculate gravity force
		var gravity = new PVector(0, 0.1 * mover.mass);

		mover.applyForce(friction);
		mover.applyForce(wind);
		mover.applyForce(gravity);

		mover.update();
		mover.checkEdges();
		mover.display();
	}

	stage.update();
}