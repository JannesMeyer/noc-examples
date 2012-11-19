/**
 * Mover module
 */
define(['createjs', 'PVector'],
function(createjs, PVector) {

	function Mover(m, x, y) {
		this.mass = 1;
		this.location = new PVector(400, 50);
		this.velocity = new PVector(1, 0);
		this.acceleration = new PVector(0, 0);

		// Create ball
		this.shape = new createjs.Shape();
		this.shape.graphics
			.beginFill('#999')
			.drawCircle(0, 0, this.mass * 8);
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

		// Check left and right bounce
		if (this.location.x > canvas.width) {
			vel.x *= -1;
			this.location.x = canvas.width;
		} else if (this.location.x < 0) {
			vel.x *= -1;
			this.location.x = 0;
		}

		// Check floor bounce
		if (this.location.y + radius > canvas.height) {
			vel.y *= -1;
			this.location.y = canvas.height - radius;
		}
	};
	
	Mover.prototype.isInside = function(liquid) {
		var x = this.location.x;
		var y = this.location.y;

		return (x > liquid.x) && (x < liquid.x + liquid.width) &&
		       (y > liquid.y) && (y < liquid.y + liquid.height);
	};
	
	Mover.prototype.drag = function(liquid) {
		var speed = this.velocity.mag();
		// Normalization is done by dividing by speed. This saves a few function calls.
		var drag = this.velocity.clone().mult(-1 * speed * speed * liquid.c / speed);
		this.applyForce(drag);
	};

	return Mover;

});