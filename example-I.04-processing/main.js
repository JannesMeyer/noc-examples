function sketch(p) {

	p.size(640, 480);
	p.background(255);
	// Initialize generator
	var generator = new p.Random();

	p.draw = function() {
		// Get a gaussian random number w/ mean of 0 and standard deviation of 1.0
		var xloc = generator.nextGaussian();

		// Define a standard deviation
		var sd = 100;
		// Define a mean value (middle of the screen along the x-axis)
		var mean = p.width / 2;
		// Scale the gaussian random number by standard deviation and mean
		xloc = ( xloc * sd ) + mean;

		p.noStroke();
		p.fill(0, 10);
		// Draw an ellipse at our "normal" random location
		p.ellipse(xloc, p.height / 2, 16, 16);
	};

}

new Processing('canvas', sketch);