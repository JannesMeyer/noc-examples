requirejs.config({
	baseUrl: 'js',
	paths: {
		createjs: '../../js/vendor/easeljs-0.5.0.min',
		_:        '../../js/vendor/underscore.min',
		vec2:     '../../js/vec2',
		random:   '../../js/random'
	},
	shim: {
		createjs: { exports: 'createjs' },
		_:        { exports: '_' }
	}
});

/*
 * Code
 */
var stage;

requirejs(['createjs', '_', 'vec2'],
function(createjs, _, Vec2) {

	stage = new createjs.Stage('canvas');

	function resizeToFullWindow() {
		stage.canvas.width = window.innerWidth;
		stage.canvas.height = window.innerHeight;
	}
	resizeToFullWindow();
	addEventListener('resize', _.debounce(resizeToFullWindow, 200), false);


	// Create line
	var line = new createjs.Shape();
	stage.addChild(line);

	// Start ticker
	createjs.Ticker.addListener(tick);
	createjs.Ticker.setFPS(60);

	function tick() {
		var mouse = new Vec2(stage.mouseX, stage.mouseY);
		var center = new Vec2(stage.canvas.width / 2, stage.canvas.height / 2);

		// Prevent drawing a line to (0, 0) directly after loading the page
		if (!mouse.isNull()) {
			// Calculate direction
			mouse.sub(center);
			// Normalize vector
			mouse.normalize();
			mouse.mult(100);

			line.graphics
				.clear()
				.setStrokeStyle(2)
				.beginStroke('#000')
				.moveTo(center.x, center.y)
				.lineTo(center.x + mouse.x, center.y + mouse.y);
		}

		stage.update();
	}

});