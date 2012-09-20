window.addEventListener("DOMContentLoaded", init);

var stage;
var canvasWidth;
var canvasHeight;

function init() {
	stage = new createjs.Stage("canvas");

	var btn1 = stage.addChild(new Button("Hello!", "#f00"));
	btn1.y = 20;

	var btn2 = stage.addChild(new Button("Goodbye.", "#0f0"));
	btn2.y = btn1.y + 50;

	var btn3 = stage.addChild(new Button("Hello again!", "#0ff"));
	btn3.y = btn2.y + 50;

	btn1.x = btn2.x = btn3.x = 20;

	// Start ticker
	createjs.Ticker.addListener(window);
	createjs.Ticker.setFPS(60);
}

function tick() {
	/*
	circle.alpha = 0.2;
	if (circle.hitTest(stage.mouseX, stage.mouseY)) {
		circle.alpha = 1;
	}
	console.log(circle.globalToLocal(stage.mouseX, stage.mouseY));
	*/

	stage.update();
}