/**
 * Vec2
 *
 * @author Jannes Meyer
 */
define(function() {

	function Vec2(x, y) {
		this.x = x;
		this.y = y;
	}

	Vec2.prototype.add = function(v) {
		this.x += v.x;
		this.y += v.y;
		// Allow for chaining
		return this;
	};

	Vec2.prototype.sub = function(v) {
		this.x -= v.x;
		this.y -= v.y;
		return this;
	};

	Vec2.prototype.mult = function(factor) {
		this.x *= factor;
		this.y *= factor;
		return this;
	};

	Vec2.prototype.div = function(dividend) {
		this.x /= dividend;
		this.y /= dividend;
		return this;
	};

	// Magnitude
	Vec2.prototype.mag = function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	};

	Vec2.prototype.normalize = function() {
		// Inlined function calls for better performance
		var magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
		if (magnitude !== 0) {
			this.x /= magnitude;
			this.y /= magnitude;
		}
		return this;
	};

	// Check for null vector
	Vec2.prototype.isNull = function() {
		return this.x === 0 && this.y === 0;
	};

	// Limit the magnitude of the vector
	Vec2.prototype.limit = function(max) {
		if (this.mag() > max) {
			this.normalize();
			this.mult(max);
		}
		return this;
	};

	// I don't need no static methods
	Vec2.prototype.clone = function() {
		return new Vec2(this.x, this.y);
	};

	return Vec2;

});