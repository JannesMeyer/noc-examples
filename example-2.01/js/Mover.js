/**
 * Mover module
 */
define(['createjs', 'vec2'],
function(createjs, Vec2) {

	function Mover() {
		this.location = new Vec2(30, 30);
		this.velocity = new Vec2(0, 0);
		this.acceleration = new Vec2(0, 0);
		this.mass = 1;

		// Create ball
		this.shape = new createjs.Shape();
		this.shape.graphics
			.beginFill(createjs.Graphics.getRGB(0, 0, 0, 1))
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
		var loc = this.location;
		var vel = this.velocity;

		if (loc.x > canvas.width) {
			vel.x *= -1;
			loc.x = canvas.width;
		} else if (loc.x < 0) {
			vel.x *= -1;
			loc.x = 0;
		}

		if (loc.y > canvas.height) {
			vel.y *= -1;
			loc.y = canvas.height;
		}
	};

	return Mover;

});