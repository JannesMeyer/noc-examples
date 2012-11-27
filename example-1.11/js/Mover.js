/**
 * Mover module
 */
define(['createjs', 'random', 'vec2'],
function(createjs, random, Vec2) {

	function Mover() {
		this.location = new Vec2(random.int(stage.canvas.width), random.int(stage.canvas.height));
		this.velocity = new Vec2(0, 0);
		this.acceleration = new Vec2(0, 0);
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

	return Mover;

});