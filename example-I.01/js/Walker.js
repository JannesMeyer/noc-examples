/**
 * Walker module
 */
define(['createjs', 'vec2', 'random'],
function(createjs, Vec2, random) {

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
		var choice = random.int(3);
		if (choice === 0) {
			++this.location.x;
		} else if (choice === 1) {
			--this.location.x;
		} else if (choice === 2) {
			++this.location.y;
		} else if (choice === 3) {
			--this.location.y;
		}
	};

	return Walker;

});