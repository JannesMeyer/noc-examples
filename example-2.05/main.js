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

requirejs(['createjs', '_', 'random', 'vec2', 'Mover', 'Liquid'],
function(createjs, _, random, Vec2, Mover, Liquid) {

	stage = new createjs.Stage('canvas');

	function resizeToFullWindow() {
		stage.canvas.width = window.innerWidth;
		stage.canvas.height = window.innerHeight;
	}
	resizeToFullWindow();
	addEventListener('resize', _.debounce(resizeToFullWindow, 200), false);

	// Create movers
	var movers = [];
	var width = stage.canvas.width;
	var height = stage.canvas.height;
	_(20).times(function() {
		movers.push(new Mover(random.float(1, 4), random.int(width), random.float(-50, 200)));
	});
	// Create liquid
	var liquid = new Liquid(0, 3 * height / 5, width, 2 * height / 5, 0.1);

	// Start ticker
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addListener(tick);

	function tick() {
		// Friction coefficient
		var c = 0.02;
		// Wind force
		var wind = new Vec2(0.01, 0);

		_(movers).each(function(mover) {
			// Calculate friction force, which points in the opposite direction of velocity
			var friction = mover.velocity.clone()
				.mult(-1)
				.normalize()
				.mult(c);
			// Calculate gravity force (scaled by mass)
			var gravity = new Vec2(0, 0.1 * mover.mass);

			// Apply wind, friction, and gravity
			mover.applyForce(gravity);
			mover.applyForce(wind);
			mover.applyForce(friction);

			// Exert drag if in liquid
			if (mover.isInside(liquid)) {
				mover.drag(liquid);
			}

			mover.update();
			mover.checkEdges();
			mover.display();
		});

		stage.update();
	}

});