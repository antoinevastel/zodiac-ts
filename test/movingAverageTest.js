var ts = require('../index.js');
var exports = module.exports = {};

exports.testMovingAverageSmoothing = function() {

	var order = 1;
	var data = [25, 29, 24, 21, 26, 23, 27, 25, 21, 24, 26, 29, 25];

	var movingAverage = new ts.MovingAverage(data);
	var dataSmoothed = movingAverage.smooth(order);

	return dataSmoothed;
};
