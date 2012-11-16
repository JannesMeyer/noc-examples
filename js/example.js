// PVector constructor
PVector = function(x, y) {
	this.x = x;
	this.y = y;
};
// Add another vector
PVector.prototype.add = function(v) {
	// TODO: check if the v is a PVector
	if (typeof v === 'undefined') {
		console.error('Missing paramter for PVector.add');
	}

	// Addition
	this.x += v.x;
	this.y += v.y;
};

var stage;
var ball = {
	location: new PVector(100, 100),
	velocity: new PVector(4, 7),
	radius: 20
};
var ballShape;

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

	// Create ball
	ballShape = new createjs.Shape();
	ballShape.graphics.beginFill('#f00').drawCircle(0, 0, ball.radius);
	stage.addChild(ballShape);
	
	// Start ticker
	createjs.Ticker.addListener(window);
	createjs.Ticker.setFPS(60);
}

function tick() {
	// Move the ball
	ball.location.add(ball.velocity);

	// Check for bouncing
	if (((ball.location.x + ball.radius) > stage.canvas.width) || (ball.location.x < ball.radius)) {
		ball.velocity.x *= -1;
	}
	if (((ball.location.y + ball.radius) > stage.canvas.height) || (ball.location.y < ball.radius)) {
		ball.velocity.y *= -1;
	}

	// Update position
	ballShape.x = ball.location.x;
	ballShape.y = ball.location.y;

	stage.update();
}