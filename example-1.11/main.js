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
var mouse;

requirejs(['createjs', '_', 'vec2', 'Mover'],
function(createjs, _, Vec2, Mover) {

	stage = new createjs.Stage('canvas');

	function resizeToFullWindow() {
		stage.canvas.width = window.innerWidth;
		stage.canvas.height = window.innerHeight;
	}
	resizeToFullWindow();
	addEventListener('resize', _.debounce(resizeToFullWindow, 200), false);

	// Create Mover
	var movers = [];
	for (var i = 0; i < 20; ++i) {
		movers.push(new Mover());
	}
	// Create a Point that will be used to store the mouse position
	mouse = new Vec2(0, 0);

	// Start ticker
	createjs.Ticker.addListener(tick);
	createjs.Ticker.setFPS(60);

	function tick() {
		for (var i = 0, len = movers.length; i < len; ++i) {
			movers[i].update();
			movers[i].checkEdges();
			movers[i].display();
		}

		stage.update();
	}

});