/**
 * PVector module
 */
define(function() {

	function PVector(x, y) {
		this.x = x;
		this.y = y;
	}

	PVector.prototype.add = function(v) {
		this.x += v.x;
		this.y += v.y;
		// Allow for chaining
		return this;
	};

	PVector.prototype.sub = function(v) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	};

	PVector.prototype.mult = function(factor) {
		this.x *= factor;
		this.y *= factor;
		return this;
	};

	PVector.prototype.div = function(dividend) {
		this.x /= dividend;
		this.y /= dividend;
		return this;
	};

	// Magnitude
	PVector.prototype.mag = function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	};

	PVector.prototype.normalize = function() {
		// Inlined function calls for better performance
		var magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
		if (magnitude !== 0) {
			this.x /= magnitude;
			this.y /= magnitude;
		}
		return this;
	};

	// Check for null vector
	PVector.prototype.isNull = function() {
		return this.x === 0 && this.y === 0;
	};

	// Limit the magnitude of the vector
	PVector.prototype.limit = function(max) {
		if (this.mag() > max) {
			this.normalize();
			this.mult(max);
		}
		return this;
	};

	// I don't need no static methods
	PVector.prototype.clone = function() {
		return new PVector(this.x, this.y);
	};

	return PVector;

});