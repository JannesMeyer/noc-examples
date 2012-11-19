/*
 * Require.js configuration
 */
requirejs.config({
	baseUrl: 'js',
	paths: {
		createjs: 'vendor/easeljs-0.5.0.min',
		underscore: 'vendor/underscore.min'
	},
	shim: {
		createjs: {
			exports: 'createjs'
		},
		underscore: {
			exports: '_'
		}
	}
});



/*
 * Main
 */
requirejs(['createjs', 'underscore', 'random', 'PVector', 'Mover', 'Attractor'],
function(createjs, _, random, PVector, Mover, Attractor) {

	// Attention everyone! This is global
	stage = new createjs.Stage('canvas');

	// Canvas shortcut variable
	var canvas = stage.canvas;

	// Automatically resize the canvas to fullscreen, fuck performance
	resizeToFullWindow();
	addEventListener('resize', _.debounce(resizeToFullWindow, 200), false);
	function resizeToFullWindow() {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}

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