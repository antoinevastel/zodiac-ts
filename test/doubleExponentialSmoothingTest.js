var ts = require('../index.js');
var exports = module.exports = {};

exports.testPredict = function() {

	var alpha = 0.4;
	var data = [112, 108, 117, 122, 119, 127, 132, 131, 139, 145, 148, 150];
	var doubleExpSmooth = new ts.DoubleExponentialSmoothing(data, alpha);
	var forecast = doubleExpSmooth.predict(3);

	return forecast;
};


exports.testOptimizationAlpha = function()
{
	var data = [112, 108, 117, 122, 119, 127, 132, 131, 139, 145, 148, 150];
	var doubleExpSmooth = new ts.DoubleExponentialSmoothing(data, null);

	return doubleExpSmooth.optimizeParameter(20);
};
