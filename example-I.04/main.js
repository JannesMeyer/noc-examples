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

	// Create a generator for the gaussian normal distribution
	var generator = new random.Generator();

	// Start ticker
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addListener(tick);

	function tick() {
		// Get a gaussian random number w/ mean of 0 and standard deviation of 1.0
		var rnd = generator.nextGaussian();
		// Scale the gaussian random number by standard deviation and mean
		var x = (rnd * 100) + (stage.canvas.width / 2);

		var circle = new createjs.Shape();
		circle.graphics
			.beginFill(createjs.Graphics.getRGB(0, 0, 0, 0.1))
			.drawCircle(x, stage.canvas.height / 2, 8);
		stage.addChild(circle);

		stage.update();
	}

});