/**
 * Attractor module
 */
define(['createjs', 'vec2'],
function(createjs, Vec2) {

	function constrain(number, min, max) {
		if (number < min) {
			return min;
		} else if (number > max) {
			return max;
		} else {
			return number;
		}
	}

	function Attractor() {
		this.location = new Vec2(400, 100);
		this.mass = 20;
		this.g = 0.4;

		// Create ball
		this.shape = new createjs.Shape();
		this.shape.graphics
			.beginFill(createjs.Graphics.getRGB(0, 0, 0))
			.drawCircle(0, 0, this.mass);
		stage.addChild(this.shape);
	}

	Attractor.prototype.display = function() {
		this.shape.x = this.location.x;
		this.shape.y = this.location.y;
	};

	Attractor.prototype.attract = function(mover) {
		// mover -> attractor
		var force = this.location.clone().sub(mover.location);

		// Constrain distance, so our circle doesn't spin out of control
		var distance = constrain(force.mag(), 5, 25);
		var strength = (this.g * this.mass * mover.mass) / (distance * distance);
		force.normalize().mult(strength);

		return force;
	};

	return Attractor;

});