/**
 * Random
 *
 * @author Jannes Meyer
 */
define(function() {
	return {

		/**
		 * Returns a random natural number between the lower and upper bound (including both bounds).
		 * Can alternatively be called with just one parameter, in which case the lower
		 * bound will be assumed to be zero.
		 */
		int: function(lower, upper) {
			if (typeof upper === 'undefined') {
				// Use the first parameter as upper bound and 0 as lower bound
				return Math.floor(Math.random() * (lower + 1));
			} else {
				// We are always rounding down, so we have to extend the upper bound by one
				return Math.floor(Math.random() * (upper + 1 - lower)) + lower;
			}
		},

		/**
		 * Returns a random real number between the lower and upper bound
		 * (including the lower bound, but not the upper bound).
		 * Can alternatively be called with just one parameter, in which case the lower
		 * bound will be assumed to be zero.
		 */
		float: function(lower, upper) {
			if (typeof upper === 'undefined') {
				// Use the first parameter as upper bound and 0 as lower bound
				return Math.random() * lower;
			} else {
				return Math.random() * (upper - lower) + lower;
			}
		},

		/**
		 * Gaussian normal distribution
		 */
		Generator: function(seed) {
			var haveNextNextGaussian = false;
			var nextNextGaussian;

			this.nextGaussian = function() {
				if (haveNextNextGaussian) {
					haveNextNextGaussian = false;
					return nextNextGaussian;
				}

				var v1, v2, s;
				do {
					v1 = 2 * Math.random() - 1;
					v2 = 2 * Math.random() - 1;
					s = v1 * v1 + v2 * v2;
				} while (s >= 1 || s === 0);

				var multiplier = Math.sqrt(-2 * Math.log(s) / s);
				nextNextGaussian = v2 * multiplier;
				haveNextNextGaussian = true;

				return v1 * multiplier;
			};
		}

	};
});