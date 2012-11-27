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

	// Create ball
	var ball = {
		location: new Vec2(100, 100),
		velocity: new Vec2(4, 7),
		radius: 20
	};
	var ballShape = new createjs.Shape();
	ballShape.graphics.beginFill('#f00').drawCircle(0, 0, ball.radius);
	stage.addChild(ballShape);

	// Start ticker
	createjs.Ticker.addListener(tick);
	createjs.Ticker.setFPS(60);

	function tick() {
		// Move the ball
		ball.location.add(ball.velocity);

		// Check for bouncing
		if (((ball.location.x + ball.radius) > stage.canvas.width) || (ball.location.x < ball.radius)) {
			ball.velocity.x *= -1;
		}
		if (((ball.location.y + ball.radius) > stage.canvas.height) || (ball.location.y < ball.radius)) {
			ball.velocity.y *= -1;
		}

		// Update position
		ballShape.x = ball.location.x;
		ballShape.y = ball.location.y;

		stage.update();
	}

});