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

	return forecast;
};

exports.testOptimizationParametersAdd = function()
{
	var data = [61.5, 63.2, 55.8, 71.4, 70, 71.4, 63.9, 78.9, 78.3, 78.6, 71.9, 87, 86.2, 87.5, 80.1, 92.5];
	var holtWintersSmooth = new ts.HoltWintersSmoothing(data, null, null, null, 4, false);

	return holtWintersSmooth.optimizeParameters(20);
};

exports.testOptimizationParametersMult = function()
{
	var data = [61.5, 63.2, 55.8, 71.4, 70, 71.4, 63.9, 78.9, 78.3, 78.6, 71.9, 87, 86.2, 87.5, 80.1, 92.5];
	var holtWintersSmooth = new ts.HoltWintersSmoothing(data, null, null, null, 4, true);

	return holtWintersSmooth.optimizeParameters(20);
};
