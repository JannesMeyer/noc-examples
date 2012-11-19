/**
 * Random module
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
		}

	};
});