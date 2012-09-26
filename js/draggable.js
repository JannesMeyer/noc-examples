var stage;

function init() {
	stage = new createjs.Stage("canvas");
	stage.mouseMoveOutside = true;

	// Create a container
	var dragger = new createjs.Container();
	dragger.x = dragger.y = 100;
	dragger.name = "drag";

	// Create a circle
	var circle = new createjs.Shape();
	circle.graphics.beginFill("red").drawCircle(0, 0, 50);

	// Create a label
	var label = new createjs.Text("drag me", "bold 14px sans-serif", "#fff");
	label.textAlign = "center";
	label.y = -7;

	// Add items and listeners
	dragger.addChild(circle, label);
	stage.addChild(dragger);
	createjs.Ticker.addListener(window);

	// Mousedown
	dragger.onPress = function(e) {
		console.log(e);
		// e.target === dragger
		var offset = {
			x: e.target.x - e.stageX,
			y: e.target.y - e.stageY
		};
		e.onMouseMove = function(e) {
			e.target.x = e.stageX + offset.x; 
			e.target.y = e.stageY + offset.y; 
		};
	};
}

function tick() {
	stage.update();
}


addEventListener("DOMContentLoaded", init, false);
