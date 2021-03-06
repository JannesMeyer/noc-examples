/**
 * Mover module
 */
define(['createjs', 'vec2'],
function(createjs, Vec2) {

	function Mover(m, x, y) {
		this.mass = m;
		this.location = new Vec2(x, y);
		this.velocity = new Vec2(0, 0);
		this.acceleration = new Vec2(0, 0);

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

	return Mover;

});