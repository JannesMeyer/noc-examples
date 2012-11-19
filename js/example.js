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
requirejs(['createjs', 'underscore', 'random', 'PVector', 'Mover', 'Liquid'],
function(createjs, _, random, PVector, Mover, Liquid) {

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

	// Create movers
	var movers = [];
	_(20).times(function() {
		movers.push(new Mover(random.float(1, 4), random.int(canvas.width), random.float(-50, 200)));
	});
	// Create liquid
	var liquid = new Liquid(0, 3 * canvas.height / 5, canvas.width, 2 * canvas.height / 5, 0.1);

	// Start ticker
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addListener(tick);

	function tick() {
		// Friction coefficient
		var c = 0.02;
		// Wind force
		var wind = new PVector(0.01, 0);

		_(movers).each(function(mover) {
			// Calculate friction force, which points in the opposite direction of velocity
			var friction = mover.velocity.clone()
				.mult(-1)
				.normalize()
				.mult(c);
			// Calculate gravity force (scaled by mass)
			var gravity = new PVector(0, 0.1 * mover.mass);
			
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