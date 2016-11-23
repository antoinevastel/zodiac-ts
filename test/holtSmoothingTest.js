var ts = require('../index.js');
var exports = module.exports = {};

exports.testPredict = function() {

	var alpha = 0.4;
	var gamma = 0.6;

	var data = [220, 224, 226, 225, 230, 232, 228, 232, 236, 236, 235, 239];

	var holtSmooth = new ts.HoltSmoothing(data, alpha, gamma);
	var forecast = holtSmooth.predict(3);

	return forecast;
};


exports.testOptimizationParameters = function()
{
	var data = [220, 224, 226, 225, 230, 232, 228, 232, 236, 236, 235, 239];
	var holtSmooth = new ts.HoltSmoothing(data, null, null);

	return holtSmooth.optimizeParameters(20);
};
