/**
 * Mover module
 */
define(['createjs', 'vec2'],
function(createjs, Vec2) {

	function Mover() {
		var center = new Vec2(stage.canvas.width/2, stage.canvas.height/2);
		this.location = center;
		this.velocity = new Vec2(0, 0);
		this.acceleration = new Vec2(-0.001, 0.01);
		this.topspeed = 10;

		// Create ball
		this.radius = 16;
		this.shape = new createjs.Shape();
		this.shape.graphics
			.beginFill('#000')
			.drawCircle(0, 0, this.radius);
		stage.addChild(this.shape);
	}
	Mover.prototype.update = function() {
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

	return Mover;

});