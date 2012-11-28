function sketch(p) {

	p.setup = function() {
		p.size(640, 480);
		p.background(0);

		// disable clearing and redrawing
		p.noLoop();
	};

	// parameters
	var increment = 0.02;

	// draw function
	p.draw = function() {
		p.loadPixels();
		var xoff = 0;

		for(var x = 0; x < p.width; x++) {
 			xoff += increment;

 			var yoff = 0.0;
 			for(var y = 0; y < p.height; y++) {
 				yoff += increment;

 				var bright = p.noise(xoff, yoff) * 255;
 				p.pixels.setPixel(x+y*p.width, p.color(bright));
 			}
 		}

		p.updatePixels();
	};

}

new Processing('canvas', sketch);