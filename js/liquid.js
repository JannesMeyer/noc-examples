/**
 * Liquid module
 */
define(['createjs'],
function(createjs) {

	function Liquid(x, y, width, height, c) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.c = c;

		// Help us see the liquid
		this.shape = new createjs.Shape();
		this.shape.graphics
			.beginFill(createjs.Graphics.getRGB(12, 119, 228, 0.75))
			.drawRect(x, y, width, height);
		stage.addChild(this.shape);
	}

	return Liquid;

});