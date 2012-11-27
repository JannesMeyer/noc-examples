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

requirejs(['createjs', '_', 'random', 'vec2', 'Mover', 'Attractor'],
function(createjs, _, random, Vec2, Mover, Attractor) {

	stage = new createjs.Stage('canvas');

	function resizeToFullWindow() {
		stage.canvas.width = window.innerWidth;
		stage.canvas.height = window.innerHeight;
	}
	resizeToFullWindow();
	addEventListener('resize', _.debounce(resizeToFullWindow, 200), false);

	// Create a mover and an attractor
	var a = new Attractor();
	var m = new Mover();

	// Start ticker
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addListener(tick);

	function tick() {

		var force = a.attract(m);
		m.applyForce(force);
		m.update();

		a.display();
		m.display();

		stage.update();

	}

});