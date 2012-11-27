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
 * Main
 */
var stage;
var generator;

requirejs(['createjs', '_', 'random'],
function(createjs, _, random) {

	stage = new createjs.Stage('canvas');

	function resizeToFullWindow() {
		stage.canvas.width = window.innerWidth;
		stage.canvas.height = window.innerHeight;
	}
	resizeToFullWindow();
	addEventListener('resize', _.debounce(resizeToFullWindow, 200), false);

	// Setup
	var generator = new random.Generator();

	// Start ticker
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addListener(tick);

	function tick() {
		// Place a circle
		var num = generator.nextGaussian();
		var sd = 100;
		var mean = stage.canvas.width / 2;
		var x = num * sd + mean;
		var y = stage.canvas.height / 2;

		var circle = new createjs.Shape();
		circle.graphics
			.beginFill(createjs.Graphics.getRGB(0, 0, 0, 0.1))
			.drawCircle(x, y, 8);
		stage.addChild(circle);

		stage.update();
	}

});