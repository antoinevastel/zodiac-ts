var ts = require('../index.js');
var exports = module.exports = {};

exports.testPredict = function() {

	var alpha = 0.4;
	var data = [25, 29, 24, 21, 26, 23, 27, 25, 21, 24, 26, 29, 25];

	var simpleExpSmooth = new ts.SimpleExponentialSmoothing(data, alpha);
	var forecast = simpleExpSmooth.predict();

	return forecast;
};


exports.testOptimizationAlpha = function()
{
	var data = [25, 29, 24, 21, 26, 23, 27, 25, 21, 24, 26, 29, 25];
	var simpleExpSmooth = new ts.SimpleExponentialSmoothing(data, null);

	return simpleExpSmooth.optimizeParameter(20);
};
