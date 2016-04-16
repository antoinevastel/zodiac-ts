var ts = require('../index.js');
var exports = module.exports = {};

exports.testPredictAdd = function() {

	var alpha = 0.4;
	var gamma = 0.2;
	var delta = 0.5;

	var data = [61.5, 63.2, 55.8, 71.4, 70, 71.4, 63.9, 78.9, 78.3, 78.6, 71.9, 87, 86.2, 87.5, 80.1, 92.5];

	var holtWintersSmooth = new ts.HoltWintersSmoothing(data, alpha, gamma, delta, 4, false);
	var forecast = holtWintersSmooth.predict();

	return forecast;
};

exports.testPredictMult = function() {

	var alpha = 0.4;
	var gamma = 0.2;
	var delta = 0.5;

	var data = [61.5, 63.2, 55.8, 71.4, 70, 71.4, 63.9, 78.9, 78.3, 78.6, 71.9, 87, 86.2, 87.5, 80.1, 92.5];

	var holtWintersSmooth = new ts.HoltWintersSmoothing(data, alpha, gamma, delta, 4, true);
	var forecast = holtWintersSmooth.predict();

	console.log(forecast);
	return forecast;
};

/*
exports.testOptimizationParameters = function()
{
	var data = [220, 224, 226, 225, 230, 232, 228, 232, 236, 236, 235, 239];
	var holtSmooth = new ts.HoltSmoothing(data, null, null);

	return holtSmooth.optimizeParameters(20);
};
*/