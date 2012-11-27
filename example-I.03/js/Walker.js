/**
 * Walker module
 */
define(['createjs', 'vec2'],
function(createjs, Vec2) {

	function Walker() {
		this.location = new Vec2(stage.canvas.width / 2, stage.canvas.height / 2);
	}

	Walker.prototype.display = function() {
		var circle = new createjs.Shape();
		circle.graphics
			.beginFill('#000')
			.drawCircle(this.location.x, this.location.y, 1);
		stage.addChild(circle);
	};

	Walker.prototype.step = function() {
		var r = Math.random();
		if (r < 0.4) {
			++this.location.x;
		} else if (r < 0.6) {
			--this.location.x;
		} else if (r < 0.8) {
			++this.location.y;
		} else {
			--this.location.y;
		}
	};

	return Walker;

});