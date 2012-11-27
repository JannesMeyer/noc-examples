/**
 * Mover module
 */
define(['createjs', 'vec2', 'random'],
function(createjs, Vec2, random) {

	function Mover() {
		this.location = new Vec2(random.int(stage.canvas.width), random.int(stage.canvas.height));
		this.velocity = new Vec2(random.float(-2, 2), random.float(-2, 2));
		this.radius = 16;

		// Create ball
		this.shape = new createjs.Shape();
		this.shape.graphics
			.beginFill('#000')
			.drawCircle(0, 0, this.radius);
		stage.addChild(this.shape);
	}

	Mover.prototype.update = function() {
		// The Mover moves
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