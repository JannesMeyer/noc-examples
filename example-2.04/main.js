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

requirejs(['createjs', '_', 'random', 'vec2', 'Mover'],
function(createjs, _, random, Vec2, Mover) {

	stage = new createjs.Stage('canvas');

	function resizeToFullWindow() {
		stage.canvas.width = window.innerWidth;
		stage.canvas.height = window.innerHeight;
	}
	resizeToFullWindow();
	addEventListener('resize', _.debounce(resizeToFullWindow, 200), false);


	var movers = [];
	for (var i = 0; i < 20; ++i) {
		// movers.push(new Mover(random.float(1, 4), 0, 0));
		movers.push(new Mover(random.float(1, 4), random.int(stage.canvas.width), 0));
	}

	// Start ticker
	createjs.Ticker.addListener(tick);
	createjs.Ticker.setFPS(60);

	function tick() {
		// Friction coefficient
		var c = 0.05;
		// Wind force
		var wind = new Vec2(0.01, 0);

		for (var i = 0, len = movers.length; i < len; ++i) {
			var mover = movers[i];

			// Calculate friction force, which points in the opposite direction of velocity
			var friction = mover.velocity.clone()
				.mult(-1)
				.normalize()
				.mult(c);
			// Calculate gravity force
			var gravity = new Vec2(0, 0.1 * mover.mass);

			mover.applyForce(friction);
			mover.applyForce(wind);
			mover.applyForce(gravity);

			mover.update();
			mover.checkEdges();
			mover.display();
		}

		stage.update();
	}

});